require('./ui')
const {createRenderer} = require("../../apex-app")
const Game             = require('./game')
const {maps}           = Game


window.game = new Game()
window.game.loadMap(maps.test)

createRenderer(window.game, {
    rendererOptions: {
        backgroundColor: 0x333333
    }
})

