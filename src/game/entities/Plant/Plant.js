const GameLifeform = require('../../GameLifeform')
const Trunk        = require('./Trunk')

class Plant extends GameLifeform {
    constructor(options) {
        super(options)
        this._trunk = new Trunk()
    }

    get trunk() {
        return this._trunk
    }
}

module.exports = Plant

Plant.Trunk = Trunk
