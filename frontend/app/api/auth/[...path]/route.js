import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDatabase, databaseIsDisabled, getMongoStatus } from '../../../../../backend/src/config/db.js';
import { inMemoryStore } from '../../../../../backend/src/config/store.js';
import Admin from '../../../../../backend/src/models/Admin.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const jwtSecret = process.env.JWT_SECRET || 'development-secret';

function setTokenCookie(token, clear = false) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const value = clear ? '' : token;
  const maxAge = clear ? 0 : 60 * 60 * 24 * 7;
  return `token=${value}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function getRequestToken(request) {
  const tokenCookie = (request.headers.get('cookie') || '')
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('token='));

  return tokenCookie ? decodeURIComponent(tokenCookie.slice('token='.length)) : '';
}

async function connectIfConfigured() {
  if (!databaseIsDisabled()) {
    await connectDatabase();
  }
}

export async function POST(request, { params }) {
  const [action] = params.path || [];

  if (action === 'logout') {
    return Response.json(
      { success: true, message: 'Logged out successfully.' },
      { headers: { 'Set-Cookie': setTokenCookie('', true) } }
    );
  }

  if (action !== 'login') {
    return Response.json({ message: 'Not found.' }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!email || !password) {
    return Response.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    await connectIfConfigured();

    let admin;
    let passwordHash;
    if (getMongoStatus()) {
      admin = await Admin.findOne({ email });
      passwordHash = admin?.passwordHash;
    } else {
      const expectedEmail = (process.env.ADMIN_EMAIL || inMemoryStore.admin.email).toLowerCase();
      admin = email === expectedEmail ? inMemoryStore.admin : null;
      passwordHash = admin?.passwordHash;
    }

    if (!admin || !passwordHash || !(await bcrypt.compare(password, passwordHash))) {
      return Response.json({ message: 'Invalid login credentials.' }, { status: 401 });
    }

    const adminDetails = {
      id: String(admin._id),
      name: admin.name,
      email: admin.email,
    };
    const token = jwt.sign({ ...adminDetails, role: 'admin' }, jwtSecret, { expiresIn: '7d' });

    return Response.json(
      { success: true, token, admin: adminDetails },
      { headers: { 'Set-Cookie': setTokenCookie(token) } }
    );
  } catch (error) {
    console.error('Admin login failed:', error);
    return Response.json({ message: 'Unable to authenticate at this time.' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const [action] = params.path || [];
  if (action !== 'me') {
    return Response.json({ message: 'Not found.' }, { status: 404 });
  }

  try {
    const token = getRequestToken(request);
    if (!token) {
      return Response.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const decoded = jwt.verify(token, jwtSecret);
    await connectIfConfigured();

    let admin;
    if (getMongoStatus()) {
      admin = await Admin.findById(decoded.id);
    } else if (String(inMemoryStore.admin._id) === String(decoded.id)) {
      admin = inMemoryStore.admin;
    }

    if (!admin) {
      return Response.json({ message: 'Authentication required.' }, { status: 401 });
    }

    return Response.json({
      admin: { id: String(admin._id), name: admin.name, email: admin.email, role: admin.role },
    });
  } catch {
    return Response.json({ message: 'Session expired or invalid token.' }, { status: 401 });
  }
}