
function isValidEpc(epc) {
    if (typeof epc !== 'string')
        return (false);

    if (epc.length !== 24)
        return (false);

    if (!(/[0-9A-Za-z-]/.test(epc)))
        return (false);

    if (/--/.test(epc))
        return (false);

    if (!epc.startsWith('E98A25'))
        return (false);

    if (!(/[0-9]{8}$/.test(epc)))
        return (false);

    return (true);
}

function isValidAntenna(Antenna) {
    if (typeof Antenna !== 'number')
        return (false);
    return (Antenna >= 1 && Antenna <= 4);
}

function isValidRssi(rssi) {
    if (typeof rssi !== 'number')
        return (false);
    return (parseInt(rssi) === rssi && rssi >= -70 && rssi <= 0);
}

function isValidTimestamp(timestamp) {
    if (timestamp === undefined)
        return (false);

    if (timestamp.toString().length != 13)
        return (false);

    const time = new Date(timestamp).getTime()
    return (!isNaN(parseFloat(time)) && isFinite(time));
}



module.exports = {
    isValidEpc, isValidAntenna, isValidRssi, isValidTimestamp
}