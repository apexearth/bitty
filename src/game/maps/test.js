const entities = require('../entities')
module.exports = game => {
    game.add(new entities.Plant({parent: game}))
}
