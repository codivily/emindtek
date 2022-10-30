const path = require('path');

const DB_NAME = 'etk';

module.exports = {
    'SERVER_HOST': '0.0.0.0',
    'SERVER_PORT': 3000,
    'DB_NAME': DB_NAME,
    'DB_DIR': path.dirname(__dirname) + '/db',
    'DB_PATH': path.dirname(__dirname) + '/db/' + DB_NAME + '.db'
}