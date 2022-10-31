const path = require('path');

const SERVER_HOST = '0.0.0.0';
const SERVER_PORT = 3000;
const DB_DIR = path.dirname(__dirname) + '/db';
const DB_NAME = 'etk';
const DB_PATH = DB_DIR + '/' + DB_NAME + '.db';
const EPC_ANTENNA_READ_INTERVAL = 10000; /*10s = 10_000ms*/

module.exports = {
    SERVER_HOST,
    SERVER_PORT,
    DB_DIR,
    DB_NAME,
    DB_PATH,
    EPC_ANTENNA_READ_INTERVAL
}