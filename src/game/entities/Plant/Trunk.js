const Branch = require('./Branch')

class Trunk {
    constructor() {
        this._branches = [
            new Branch(),
            new Branch(),
            new Branch(),
        ]
    }

    get branches() {
        return this._branches
    }
}

module.exports = Trunk