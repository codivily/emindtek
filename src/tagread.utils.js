function insertTagread(db, {epc, antenna, rssi, timestampreader, timestamprecv}) {

    db.serialize(() => {
        /* insert the data */
        const stmt = db.prepare('INSERT INTO tagread VALUES (?, ?, ?, ?, ?)');
        stmt.run(
            epc, antenna, rssi, timestampreader, timestamprecv
        );
        stmt.finalize();
    })
}

module.exports = {
    insertTagread
}