const Branch = require('./Branch')

class Trunk {
    constructor() {
        this._branches = [
            new Branch(),
            new Branch(),
            new Branch(),
        ]
        this._sides    = this.createSides()
    }

    get branches() {
        return this._branches
    }

    get sides() {
        return this._sides
    }

    createSides() {
        let sides          = []
        let count          = Math.floor(1 + Math.random() * 10)
        let position       = Math.random() * Math.PI * 2
        let individualSize = Math.random() * Math.PI * 2 / count
        for (let i = 0; i < count; i++) {
            let radiusPercentage = .8 + Math.random() * .2
            sides.push({position, radiusPercentage})
            position += individualSize
        }
        return sides
    }
}

module.exports = Trunk