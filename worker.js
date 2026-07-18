// TaskFlow Pro — Worker API
// Auth email+password (PBKDF2) dan penyimpanan data per akun di D1.
// Request non-/api diteruskan ke static assets.

const SESSION_COOKIE = 'tf_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 hari
const PBKDF2_ITERATIONS = 100000;
const MAX_DATA_BYTES = 1024 * 1024; // 1 MB per akun, JSON blob
const MAX_AUTH_BODY_BYTES = 4096;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      try {
        return await handleApi(request, env, url);
      } catch (err) {
        if (err instanceof HttpError) return json({ error: err.message }, err.status);
        console.error('API error:', err);
        return json({ error: 'Terjadi kesalahan di server' }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

async function handleApi(request, env, url) {
  // Tolak request lintas situs untuk semua operasi yang mengubah state.
  if (request.method !== 'GET') {
    const origin = request.headers.get('Origin');
    if (origin && origin !== url.origin) {
      return json({ error: 'Origin tidak diizinkan' }, 403);
    }
  }

  const route = request.method + ' ' + url.pathname;
  switch (route) {
    case 'POST /api/register': return register(request, env);
    case 'POST /api/login':    return login(request, env);
    case 'POST /api/logout':   return logout(request, env);
    case 'GET /api/me':        return me(request, env);
    case 'GET /api/data':      return getData(request, env);
    case 'PUT /api/data':      return putData(request, env);
    default: return json({ error: 'Endpoint tidak ditemukan' }, 404);
  }
}

// ===== Auth =====

async function register(request, env) {
  const body = await readJson(request, MAX_AUTH_BODY_BYTES);
  const email = normalizeEmail(body && body.email);
  const password = String((body && body.password) || '');
  if (!email) return json({ error: 'Email tidak valid' }, 400);
  if (password.length < 8) return json({ error: 'Password minimal 8 karakter' }, 400);
  if (password.length > 256) return json({ error: 'Password terlalu panjang' }, 400);

  const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?1')
    .bind(email).first();
  if (existing) return json({ error: 'Email sudah terdaftar. Silakan masuk.' }, 409);

  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);
  const result = await env.DB.prepare(
    'INSERT INTO users (email, password_hash, salt) VALUES (?1, ?2, ?3)'
  ).bind(email, hash, salt).run();

  const userId = result.meta.last_row_id;
  return createSession(env, userId, email);
}

async function login(request, env) {
  const body = await readJson(request, MAX_AUTH_BODY_BYTES);
  const email = normalizeEmail(body && body.email);
  const password = String((body && body.password) || '');
  if (!email || !password) return json({ error: 'Email dan password diperlukan' }, 400);

  const user = await env.DB.prepare(
    'SELECT id, email, password_hash, salt FROM users WHERE email = ?1'
  ).bind(email).first();

  // Tetap hitung hash walau user tidak ada supaya durasi respons seragam.
  const salt = user ? user.salt : randomHex(16);
  const hash = await hashPassword(password, salt);
  const valid = user && timingSafeEqualHex(hash, user.password_hash);
  if (!valid) return json({ error: 'Email atau password salah' }, 401);

  await env.DB.prepare(
    'DELETE FROM sessions WHERE user_id = ?1 AND expires_at < ?2'
  ).bind(user.id, nowSeconds()).run();

  return createSession(env, user.id, user.email);
}

async function logout(request, env) {
  const token = getSessionToken(request);
  if (token) {
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?1')
      .bind(await sha256Hex(token)).run();
  }
  return json({ ok: true }, 200, clearSessionCookie());
}

async function me(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: 'Belum login' }, 401);
  return json({ email: session.email });
}

// ===== Data =====

async function getData(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: 'Belum login' }, 401);
  const row = await env.DB.prepare(
    'SELECT data, updated_at FROM user_data WHERE user_id = ?1'
  ).bind(session.userId).first();
  if (!row) return json({ data: null, updatedAt: null });
  return new Response(
    `{"data":${row.data},"updatedAt":${JSON.stringify(row.updated_at)}}`,
    { headers: jsonHeaders() }
  );
}

async function putData(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: 'Belum login' }, 401);
  const body = await readJson(request, MAX_DATA_BYTES);
  if (!body || typeof body.data !== 'object' || body.data === null) {
    return json({ error: 'Field "data" (object) diperlukan' }, 400);
  }
  const serialized = JSON.stringify(body.data);
  const updatedAt = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO user_data (user_id, data, updated_at) VALUES (?1, ?2, ?3)
     ON CONFLICT(user_id) DO UPDATE SET data = ?2, updated_at = ?3`
  ).bind(session.userId, serialized, updatedAt).run();
  return json({ ok: true, updatedAt });
}

// ===== Session helpers =====

async function createSession(env, userId, email) {
  const token = randomHex(32);
  const expiresAt = nowSeconds() + SESSION_TTL_SECONDS;
  await env.DB.prepare(
    'INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?1, ?2, ?3)'
  ).bind(await sha256Hex(token), userId, expiresAt).run();
  const cookie = `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
  return json({ email }, 200, cookie);
}

async function getSession(request, env) {
  const token = getSessionToken(request);
  if (!token) return null;
  const row = await env.DB.prepare(
    `SELECT s.user_id AS userId, s.expires_at AS expiresAt, u.email AS email
     FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ?1`
  ).bind(await sha256Hex(token)).first();
  if (!row || row.expiresAt < nowSeconds()) return null;
  return { userId: row.userId, email: row.email };
}

function getSessionToken(request) {
  const cookies = request.headers.get('Cookie') || '';
  for (const part of cookies.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === SESSION_COOKIE) return rest.join('=');
  }
  return null;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

// ===== Crypto =====

async function hashPassword(password, saltHex) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: hexToBytes(saltHex), iterations: PBKDF2_ITERATIONS },
    key, 256
  );
  return bytesToHex(new Uint8Array(bits));
}

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return bytesToHex(new Uint8Array(digest));
}

function timingSafeEqualHex(a, b) {
  const ba = hexToBytes(a), bb = hexToBytes(b);
  if (ba.byteLength !== bb.byteLength) return false;
  return crypto.subtle.timingSafeEqual(ba, bb);
}

function randomHex(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

function bytesToHex(bytes) {
  return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex) {
  const clean = String(hex || '');
  const bytes = new Uint8Array(clean.length >> 1);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
  return bytes;
}

// ===== Util =====

function normalizeEmail(raw) {
  const email = String(raw || '').trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

async function readJson(request, maxBytes) {
  const text = await request.text();
  if (byteLength(text) > maxBytes) throw new HttpError('Payload terlalu besar', 413);
  try { return JSON.parse(text); }
  catch (_) { throw new HttpError('Body JSON tidak valid', 400); }
}

function byteLength(str) {
  return new TextEncoder().encode(str).byteLength;
}

class HttpError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

function nowSeconds() { return Math.floor(Date.now() / 1000); }

function jsonHeaders() {
  return { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
}

function json(obj, status = 200, setCookie = null) {
  const headers = jsonHeaders();
  if (setCookie) headers['Set-Cookie'] = setCookie;
  return new Response(JSON.stringify(obj), { status, headers });
}
