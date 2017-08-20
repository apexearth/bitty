const Branch = require('./Branch')

class Trunk {
    constructor() {
        this.size        = 10 + Math.random() * 30
        this._sides      = this.createSides()
        this._sideCoords = []
    }

    get sides() {
        return this._sides
    }

    get sideCoords() {
        return this._sideCoords
    }

    createSides() {
        let sides = []
        let count = Math.floor(Math.random() * 15 + 5)
        for (let i = 0; i < count; i++) {
            sides.push(this.createSide(count, i))
        }
        return sides
    }

    createSide(count, i) {
        let side    = {
            left : Math.PI * 2 / count * i,
            right: Math.PI * 2 / count * (i + 1),
            angle: Math.PI * 2 / count * (i + .5), // Angle is the midpoint, representing direction.
        }
        side.branch = new Branch({parent: side, children: 2, descendants: Math.floor(2 + Math.random() * 5)})
        return side
    }

    draw(seconds, graphics) {
        let radius = this.size
        const cos  = x => Math.cos(x) * radius
        const sin  = y => Math.sin(y) * radius
        graphics.lineStyle(1, 0xffffff, .75)
        graphics.beginFill(0xffffff, .75)
        for (let i = 0; i < this.sides.length; i++) {
            let side           = this.sides[i]
            let coords         = {
                left : {x: cos(side.left), y: sin(side.left)},
                right: {x: cos(side.right), y: sin(side.right)}
            }
            this.sideCoords[i] = coords
            if (i === 0) {
                graphics.moveTo(coords.left.x, coords.left.y)
            }
            graphics.lineTo(coords.right.x, coords.right.y)
        }
        graphics.endFill()

        for (let i = 0; i < this.sides.length; i++) {
            let side = this.sides[i]
            side.branch.draw(seconds, graphics, this.sideCoords[i], side.branch)
        }
    }
}

module.exports = Trunk