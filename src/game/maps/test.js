const entities = require('../entities')
module.exports = game => {
    game.add(new entities.Plant({app: game, parent: game}))
}
