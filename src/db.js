const fs = require('fs');
const {DB_PATH, DB_DIR} = require('./config.js');
const sqlite3 = require('sqlite3').verbose();

let db = undefined;

function dbopen() {
    if (db) {
        return (db);
    }

    if (!fs.existsSync(DB_DIR))
        fs.mkdirSync(DB_DIR);

    db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_CREATE |sqlite3.OPEN_READWRITE);
    return db;
}

function dbdrop()
{
    dbclose();
    if (fs.existsSync(DB_PATH))
        fs.rmSync(DB_PATH);
}

function dbclose()
{
    if (db) {
        db.close();
    }
    db = undefined;
}

module.exports = {
    dbopen, dbclose, dbdrop
};