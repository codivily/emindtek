
const {dbopen, dbclose, dbdrop} = require('./db.js');

function dbreinstall()
{
    dbdrop();
    db = dbopen();
    db.serialize(() => {
        /* keeps track of reads */
        db.run(`CREATE TABLE IF NOT EXISTS tagread (
            epc VARCHAR(24) NOT NULL,
            antenna TINYINT NOT NULL,
            rssi TINYINT NOT NULL,
            timestampreader BIGINT NOT NULL,
            timestamprecv BIGINT NOT NULL
        )`);

        /* Needed for performance reasons */
        db.run(`CREATE TABLE IF NOT EXISTS epc_antenna_last_read (
            epc VARCHAR(24) NOT NULL,
            antenna VARCHAR(24) NOT NULL,
            timestamprecv BIGINT NOT NULL,
            CONSTRAINT pk_epc_antenna_last_read PRIMARY KEY (epc, antenna)
        )`);
    });
    
    dbclose();
}

/* install database */
dbreinstall();