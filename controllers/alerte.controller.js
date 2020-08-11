const mysql = require('mysql');

module.exports.getAll = (req, res, next) => {
    try {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'secourisme',
            port: '3306'
        });
        connection.connect();
        connection.query('SELECT * FROM alerte', 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(result));
        })
    } catch (err) {
        next(err);
    }
}

module.exports.add = (req, res, next) => {
    try {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'secourisme',
            port: '3306'
        });
        connection.connect();
        connection.query('INSERT INTO alerte (location, alerter_number, status, date) VALUES (?,?,?,?)', 
        [
            req.body.location,
            req.body.alerter_number,
            'new',
            new Date
        ], 
        (err, result) => {
            if (err) throw err;
            connection.query('INSERT INTO notification (alerte_id, finis) VALUES ((SELECT id FROM alerte WHERE id = ?),?)',
            [
                result.insertId,
                false
            ],
            (error, results) => {
                if (error) throw error;
                res.status(200).send(JSON.stringify(true));
            });
        })
    } catch (err) {
        next(err);
    }
}

module.exports.update = (req, res, next) => {
    try {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'secourisme',
            port: '3306'
        });
        connection.connect();
        connection.query('UPDATE alerte SET location = ?, alerter_number = ?, status = ? WHERE id = ?', 
        [
            req.body.location,
            req.body.alerter_number,
            req.body.status,
            req.params.id
        ], 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(result.changedRows));
        })
    } catch (err) {
        next(err);
    }
}


module.exports.delete = (req, res, next) => {
    try {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'secourisme',
            port: '3306'
        });
        connection.connect();
        connection.query('DELETE FROM alerte where id = ?', 
        [
            req.params.id
        ], 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(result.affectedRows));
        })
    } catch (err) {
        next(err);
    }
}