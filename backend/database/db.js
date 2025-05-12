import Database from 'better-sqlite3';

const db = new Database('courier.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('admin', 'user')) NOT NULL,
    total_couriers_added INT DEFAULT 0,
    total_couriers_deleted INT DEFAULT 0
  )
` ).run();

//db.prepare(`DROP TABLE couriers`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS couriers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_id TEXT UNIQUE NOT NULL,
  sender TEXT NOT NULL,
  receiver TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT CHECK(status IN ('Pending','Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered','Cancelled')) NOT NULL DEFAULT 'Pending',
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
`).run();

// db.prepare(`DROP TABLE activities`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tracking_id TEXT NOT NULL,
    action TEXT CHECK(action IN ('added')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tracking_id) REFERENCES couriers(tracking_id) ON DELETE CASCADE
  )
`).run();

export default db;

