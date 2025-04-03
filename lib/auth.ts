import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { authenticateUser, getUserById } from './db';

// Secret key for JWT signing - in production, use a proper secret management system
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'ostrich_secret_key_change_in_production');

// Token expiration time
const EXPIRES_IN = '8h';

// Generate JWT token
export async function generateToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

// Login user and set cookie
export async function login(username: string, password: string) {
  const user = await authenticateUser(username, password);
  
  if (!user) {
    return null;
  }
  
  // Generate token
  const token = await generateToken({
    id: user.id,
    username: user.username,
    role: user.role
  });
  
  // Set cookie
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: 'strict'
  });
  
  return user;
}

// Logout user
export function logout() {
  cookies().delete('auth_token');
}

// Get current user from token
export async function getCurrentUser() {
  const token = cookies().get('auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  const payload = await verifyToken(token);
  
  if (!payload || !payload.id) {
    return null;
  }
  
  return getUserById(Number(payload.id));
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// Check if user has admin role
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}
