const Branch = require('./Branch')

class Trunk {
    constructor(plant) {
        this.plant       = plant
        this.size        = 1
        this._sides      = this.createSides()
        this._sideCoords = []
        this.branchCount = 0

        this._energy = 0
    }

    get sides() {
        return this._sides
    }

    get sideCoords() {
        return this._sideCoords
    }

    get energy() {
        return this._energy
    }

    set energy(e) {
        this._energy = e
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
        side.branch = new Branch({trunk: this, parent: side})
        return side
    }

    update(seconds) {
        let energyForTrunk = this.energy * .1
        this.size += energyForTrunk / 10
        this.energy -= energyForTrunk

        let energyForSides = this.energy
        let energyPerSide  = energyForSides / this.sides.length
        for (let i = 0; i < this.sides.length; i++) {
            let side = this.sides[i]
            side.branch.energy += energyPerSide
            side.branch.update(seconds)
        }
        this.energy = 0
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