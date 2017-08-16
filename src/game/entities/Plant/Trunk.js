const Branch = require('./Branch')

class Trunk {
    constructor() {
        this._sides = this.createSides()
        this.size   = 20
    }

    get branches() {
        return this._branches
    }

    get sides() {
        return this._sides
    }

    createSides() {
        let sides = []
        let count = Math.floor(Math.random() * 5 + 5)
        for (let i = 0; i <= count; i++) {
            sides.push(Math.PI * 2 / count * i)
        }
        return sides
    }

    draw(seconds, graphics) {
        let radius = this.size
        const cos  = x => Math.cos(x) * radius
        const sin  = y => Math.sin(y) * radius
        graphics.lineStyle(1, 0xffffff, .75)
        graphics.moveTo(cos(0), sin(0))
        for (let i = 1; i < this.sides.length; i++) {
            let side = this.sides[i]
            graphics.lineTo(cos(side), sin(side))
        }
        graphics.endFill()
    }
}

module.exports = Trunk