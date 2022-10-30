const express = require('express')
const bodyParser = require('body-parser');

const { dbopen, dbclose } = require('./db.js');
const { insertTagread } = require('./tagread.utils.js');
const { SERVER_HOST, SERVER_PORT } = require('./config.js');


/* IMPORT FIELDS VALIDATOR FUNCTIONS */
const {
    isValidEpc,
    isValidRssi,
    isValidAntenna,
    isValidTimestamp
} = require('./validators.js');

/* CREATE APP INSTANCE */
const app = express()

/* CONFIG MIDDELWARES */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


/* EXPOSE API ENTRY POINT */
app.post('/', (req, res) => {
    const errors = [];
    const body = req.body;
    const data = {};

    const db = dbopen();

    /* epc validation */
    if (isValidEpc(body.EPC)) {
        data.epc = body.EPC;
    }
    else {
        errors.push('EPC');
    }

    /* antenna validation */
    if (isValidAntenna(body.Antenna)) {
        data.antenna = body.Antenna;
    }
    else {
        errors.push('Antenna');
    }
    /* rssi validation */
    if (isValidRssi(body.RSSI)) {
        data.rssi = body.RSSI;
    }
    else {
        errors.push('RSSI');
    }

    /* timestamp validation */
    if (isValidTimestamp(body.Timestamp)) {
        data.timestampreader = body.Timestamp;
        data.timestamprecv = (new Date()).getTime();
    }
    else {
        errors.push('Timestamp');
    }

    /* print error if bad data received */
    if (errors.length > 0) {
        console.log('Invalid data received!');
        // console.log(errors);
    }
    else {
        /* insert tag */
        insertTagread(db, { ...data });
    }

    /* close database */
    dbclose();
    res.sendStatus(202);
});


/* START SERVER */
app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Application started on: ${SERVER_HOST}:${SERVER_PORT}`)
})
