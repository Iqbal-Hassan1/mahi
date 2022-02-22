class Helper {

    shallowCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }
}

module.exports = new Helper();