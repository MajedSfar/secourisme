const mysql = require('mysql');

module.exports.register = (req, res, next) => {
    try {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'secourisme',
            port: '3306'
        });
        connection.connect();
        connection.query('INSERT INTO utilisateur (name, email, tel, username, password, admin, localisation, adresse) VALUES (?,?,?,?,?,?,?,?)', 
        [
            req.body.name,
            req.body.email,
            req.body.tel,
            req.body.username,
            req.body.password,
            0, // admin
            req.body.localisation,
            req.body.adresse
        ], 
        (err, result) => {
            if (err) throw err;
            res.status(200).send(JSON.stringify(true));
        })
    } catch (err) {
        next(err);
    }
}

module.exports.authenticate = (req, res, next) => {
    try {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'secourisme',
            port: '3306'
        });
        connection.connect();
        connection.query('SELECT * FROM utilisateur where username = ?', [req.body.username], (err, result) => {
          try {
            if (err) throw err;
            if (result.length > 0) {
                if (result[0].password === req.body.password) {
                    res.status(200).send(JSON.stringify(result[0]));
                } else {
                    throw new Error('Password is false');
                }
            } else {
                throw new Error('Username not found');
            }
          } catch (error) {
              next(error);
          }
        })
    } catch (err) {
        next(err);
    }
}