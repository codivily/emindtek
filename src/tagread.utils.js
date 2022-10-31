const { EPC_ANTENNA_READ_INTERVAL } = require('./config.js');


function _shouldIgnoreEpcAntennaRead(db, { epc, antenna, timestamprecv }, cb) {
    const stmt = db.prepare(`
                        SELECT timestamprecv
                        FROM epc_antenna_last_read 
                        WHERE epc=? AND antenna=? LIMIT 1`);
                        
    stmt.get(epc, antenna, (err, row) => {
        // console.log(row);
        if (!row || timestamprecv - row.timestamprecv >= EPC_ANTENNA_READ_INTERVAL) {
            cb(false);
        }
        else {
            cb(true);
        }
    });
    stmt.finalize();
}

function _updateEpcAntennaLastRead(db, { epc, antenna, timestamprecv }) {
    /* update read interval time tracker record */
    const stmt = db.prepare(`INSERT INTO epc_antenna_last_read VALUES (?, ?, ?)
    ON CONFLICT(epc, antenna) DO UPDATE SET timestamprecv=?`);
    stmt.run(
        epc, antenna, timestamprecv, timestamprecv
    );
    stmt.finalize();
}

function _insertTagread(db, { epc, antenna, rssi, timestampreader, timestamprecv }) {
    const stmt = db.prepare('INSERT INTO tagread VALUES (?, ?, ?, ?, ?)');
    stmt.run(
        epc, antenna, rssi, timestampreader, timestamprecv
    );
    stmt.finalize();
}

/* insert tag read or ignore */
function insertTagread(db, { epc, antenna, rssi, timestampreader, timestamprecv }) {
    db.serialize(() => {
        _shouldIgnoreEpcAntennaRead(db, { epc, antenna, timestamprecv }, yesOrNo => {
            if (yesOrNo === true) {
                // console.log('ignored');
                return /* ignore this read */
            }

            /* update */
            _updateEpcAntennaLastRead(db, { epc, antenna, timestamprecv });
            _insertTagread(db, { epc, antenna, rssi, timestampreader, timestamprecv });
        })
    })
}

module.exports = {
    insertTagread
}