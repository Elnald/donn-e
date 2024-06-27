const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./votes.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY, candidate TEXT, count INTEGER)");
    db.run("INSERT OR IGNORE INTO votes (id, candidate, count) VALUES (1, 'Anass', 0)");
    db.run("INSERT OR IGNORE INTO votes (id, candidate, count) VALUES (2, 'Gautier', 0)");
});

db.close();
console.log('Database initialized.');
