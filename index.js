require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const routerIndex = require('./routes/index-router');

var server_port = process.env.PORT || 8080;
var app = express();
app.use(cors({
    origin: 'localhost:4200'
}));
app.use(bodyParser.json());
app.use('/api', routerIndex);
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send(err.message);
});
app.set('port', server_port);
const server = http.createServer(app);
server.listen(server_port, () => console.log(`Server Started at port: ${server_port}`));