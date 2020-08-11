// Checking env.
var env = process.env.NODE_ENV || 'development';
// Fetching Configuration data
var config = require('./config.json');
var envConfig = config[env];
// adding env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);