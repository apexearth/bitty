const Branch = require('./Branch')

class Trunk {
    constructor() {
        this._sides    = this.createSides()
        this._branches = this.createBranches(this._sides)
        this.size      = 20
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
            sides.push({
                left : Math.PI * 2 / count * i,
                right: Math.PI * 2 / count * (i === count ? 0 : i + 1),
                angle: Math.PI * 2 / count * (i + .5) // Angle is the midpoint, representing direction.
            })
        }
        return sides
    }

    createBranches(sides) {
        return sides.map(side => new Branch(side))
    }

    draw(seconds, graphics) {
        let radius = this.size
        const cos  = x => Math.cos(x) * radius
        const sin  = y => Math.sin(y) * radius
        graphics.lineStyle(1, 0xffffff, .75)
        for (let i = 0; i < this.sides.length; i++) {
            let side = this.sides[i]
            graphics.moveTo(cos(side.left), sin(side.left))
            graphics.lineTo(cos(side.right), sin(side.right))
        }
        graphics.endFill()
    }
}

module.exports = Trunk