const sqlite3 = require('sqlite3').verbose();

export default (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const db = new sqlite3.Database('./votes.db');

    db.all("SELECT candidate, count FROM votes", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json(rows);
        }
    });

    db.close();
};
