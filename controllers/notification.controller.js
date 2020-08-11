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
        connection.query('SELECT * FROM notification', 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(result));
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
        connection.query('UPDATE notification SET finis = ? WHERE id = ?', 
        [
            req.body.finis,
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
        connection.query('DELETE FROM notification where id = ?', 
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