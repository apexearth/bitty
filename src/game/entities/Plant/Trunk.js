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

    createSides() {
        let sides    = []
        let count    = Math.floor(Math.random() * 10)
        let position = Math.random() * Math.PI
        let initialPosition = position
        for (let i = 0; i < count; i++) {

        }
    }
}

module.exports = Trunk