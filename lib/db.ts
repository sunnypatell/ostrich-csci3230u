import Database from 'better-sqlite3';
import { hash, compare } from 'bcryptjs';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize the database
const dbPath = path.join(dataDir, 'ostrich.db');
const db = new Database(dbPath);

// Initialize the database schema
function initDb() {
  // Create users table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    );
  `);

  // Create scan_history table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS scan_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      scan_type TEXT NOT NULL,
      target TEXT NOT NULL,
      results TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Create vulnerabilities table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS vulnerabilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scan_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      severity TEXT,
      cve TEXT,
      affected TEXT,
      status TEXT DEFAULT 'open',
      discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (scan_id) REFERENCES scan_history (id)
    );
  `);

  // Check if admin user exists, if not create one
  const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  if (!adminUser) {
    // Create default admin user with password 'admin123'
    createUser('admin', 'admin123', 'admin@ostrich.local', 'admin');
    createUser('sunny.admin', 'sunny123', 'sunny.admin@ostrich.local', 'admin'); // name, pwd, smtp, role
    console.log('Created default admin user');
  }
}

// Initialize the database
initDb();

// User management functions
export async function createUser(username: string, password: string, email?: string, role: string = 'user') {
  try {
    const hashedPassword = await hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)');
    const result = stmt.run(username, hashedPassword, email || null, role);
    return { id: result.lastInsertRowid, username, email, role };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function authenticateUser(username: string, password: string) {
  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
      return null;
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    // Update last login time
    db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

export function getUserById(id: number) {
  try {
    const user = db.prepare('SELECT id, username, email, role, created_at, last_login FROM users WHERE id = ?').get(id);
    return user || null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export function getUserByUsername(username: string) {
  try {
    const user = db.prepare('SELECT id, username, email, role, created_at, last_login FROM users WHERE username = ?').get(username);
    return user || null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// Scan history functions
export function saveScanHistory(userId: number, scanType: string, target: string, results: any) {
  try {
    const stmt = db.prepare('INSERT INTO scan_history (user_id, scan_type, target, results) VALUES (?, ?, ?, ?)');
    const result = stmt.run(userId, scanType, target, JSON.stringify(results));
    return { id: result.lastInsertRowid, userId, scanType, target, createdAt: new Date() };
  } catch (error) {
    console.error('Error saving scan history:', error);
    throw error;
  }
}

export function getScanHistoryByUserId(userId: number) {
  try {
    const scans = db.prepare('SELECT * FROM scan_history WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    return scans.map(scan => ({
      ...scan,
      results: JSON.parse(scan.results || '{}')
    }));
  } catch (error) {
    console.error('Error getting scan history:', error);
    throw error;
  }
}

// Vulnerability management functions
export function saveVulnerability(scanId: number, vulnerability: any) {
  try {
    const stmt = db.prepare(`
      INSERT INTO vulnerabilities 
      (scan_id, name, description, severity, cve, affected, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      scanId,
      vulnerability.name,
      vulnerability.description,
      vulnerability.severity,
      vulnerability.cve || 'N/A',
      vulnerability.affected,
      vulnerability.status || 'open'
    );
    
    return { id: result.lastInsertRowid, ...vulnerability };
  } catch (error) {
    console.error('Error saving vulnerability:', error);
    throw error;
  }
}

export function getVulnerabilitiesByScanId(scanId: number) {
  try {
    return db.prepare('SELECT * FROM vulnerabilities WHERE scan_id = ?').all(scanId);
  } catch (error) {
    console.error('Error getting vulnerabilities:', error);
    throw error;
  }
}

export function getAllVulnerabilities() {
  try {
    return db.prepare(`
      SELECT v.*, s.target 
      FROM vulnerabilities v
      JOIN scan_history s ON v.scan_id = s.id
      ORDER BY v.discovered_at DESC
    `).all();
  } catch (error) {
    console.error('Error getting all vulnerabilities:', error);
    throw error;
  }
}

export function updateVulnerabilityStatus(id: number, status: string) {
  try {
    const stmt = db.prepare('UPDATE vulnerabilities SET status = ? WHERE id = ?');
    stmt.run(status, id);
    return { id, status };
  } catch (error) {
    console.error('Error updating vulnerability status:', error);
    throw error;
  }
}

// Export the database for direct access if needed
export { db };
