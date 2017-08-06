const {properties} = require('apex-app')
const GameObject   = require("./GameObject")

class GameLifeform extends GameObject {
    constructor(options) {
        super(options)

        this.attributes = properties({})
        this.stats      = properties({
            energy: [100, 0, 1000],
        })
    }

    update(seconds) {
        super.update(seconds)
        this.stats.energy -= seconds * .01
    }
}

module.exports = GameLifeform