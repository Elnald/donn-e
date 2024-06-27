const sqlite3 = require('sqlite3').verbose();

export default (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const { candidate } = req.body;

    if (!candidate || (candidate !== 'Anass' && candidate !== 'Gautier')) {
        res.status(400).send('Bad Request');
        return;
    }

    const db = new sqlite3.Database('./votes.db');

    db.run(
        `UPDATE votes SET count = count + 1 WHERE candidate = ?`,
        [candidate],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(200).json({ message: `${candidate} vote incremented` });
            }
        }
    );

    db.close();
};
