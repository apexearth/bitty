const Game = require('../')
const maps = require('./maps')
describe("maps", function () {
    for (let key in maps) {
        it(key, () => {
            let map  = maps[key]
            let game = new Game()
            game.loadMap(map)
        })

    }
})