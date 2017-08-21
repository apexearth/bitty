const GameLifeform = require('../../GameLifeform')
const Trunk        = require('./Trunk')

class Plant extends GameLifeform {
    constructor(options) {
        super(options)
        this._trunk     = new Trunk(this)
        this.rotation   = Math.random() * Math.PI * 2
        this.attributes = {
            energy: 100
        }
        this.draw(0)
    }

    get trunk() {
        return this._trunk
    }

    draw(seconds) {
        if (typeof window === 'undefined') return
        this.graphics.clear()
        this.trunk.draw(seconds, this.graphics)
    }

    update(seconds) {
        this.trunk.energy += this.attributes.energy * seconds
        this.trunk.update(seconds)
        this.draw(seconds)
    }
}

module.exports = Plant

Plant.Trunk = Trunk
