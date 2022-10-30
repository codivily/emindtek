
const {dbopen, dbclose, dbdrop} = require('./db.js');

function dbreinstall()
{
    dbdrop();
    db = dbopen();
    db.serialize(() => {
        /* db install */
        db.run(`CREATE TABLE IF NOT EXISTS tagread (
            epc VARCHAR(24) NOT NULL,
            antenna TINYINT NOT NULL,
            rssi TINYINT NOT NULL,
            timestampreader BIGINT NOT NULL,
            timestamprecv BIGINT NOT NULL
        )`);
    });
    
    dbclose();
}

/* install database */
dbreinstall();