-- D1 Database Schema Setup
-- Run these commands with: npx wrangler d1 execute <DATABASE_NAME> --file=./scripts/d1-setup.sql

-- Create Message table
CREATE TABLE IF NOT EXISTS Message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    image TEXT NOT NULL,
    websiteId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (websiteId) REFERENCES Website(id) ON DELETE CASCADE
);

-- Create User table
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT 0,
    image TEXT
);

-- Create Website table
CREATE TABLE IF NOT EXISTS Website (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    theme TEXT NOT NULL,
    userEmail TEXT NOT NULL,
    plan TEXT,
    active BOOLEAN DEFAULT 0,
    songUrl TEXT,
    customThemeImage TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userEmail) REFERENCES User(email)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_message_websiteId ON Message(websiteId);
CREATE INDEX IF NOT EXISTS idx_website_userEmail ON Website(userEmail);
CREATE INDEX IF NOT EXISTS idx_website_guid ON Website(guid);