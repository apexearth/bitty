const {App}    = require("../../../apex-app")
const maps     = require('./maps')
const entities = require('./entities')

class Game extends App {
    constructor() {
        super()
    }

    loadMap(map) {
        map(this)
    }

    update(seconds) {
        super.update(seconds)
    }

    static get maps() {
        return maps
    }
}

module.exports = Game