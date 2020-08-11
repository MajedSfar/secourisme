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
        connection.query('SELECT * FROM image', 
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
        connection.query('INSERT INTO image (url, alerte_id) VALUES (?,(SELECT id FROM alerte WHERE id = ?))', 
        [
            req.body.url,
            req.body.alerte_id
        ], 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(true));
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
        connection.query('UPDATE image SET url = ?, alerte_id = (SELECT id FROM alerte WHERE id = ?) WHERE id = ?', 
        [
            req.body.url,
            req.body.alerte_id,
            req.params.id
        ], 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(true));
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
        connection.query('DELETE FROM image where id = ?', 
        [
            req.params.id
        ], 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(true));
        })
    } catch (err) {
        next(err);
    }
}