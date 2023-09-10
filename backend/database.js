const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');

// Create user table
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, tronAddress TEXT)');
});

module.exports = db;
