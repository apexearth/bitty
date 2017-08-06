const {expect}     = require('chai')
const Game         = require('./Game')
const GameLifeform = require('./GameLifeform')

describe("GameLifeform", function () {

    it("basics", function () {
        const game     = new Game()
        const lifeform = new GameLifeform({parent: game})
        game.add(lifeform)
        expect(() => game.update(.1)).to.decrease(lifeform.stats, 'energy')
    })

})