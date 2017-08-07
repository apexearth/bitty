const {expect} = require('chai')

describe('Plant', () => {
    const Plant = require('./Plant')
    it('', () => {
        let plant = new Plant({parent: {}})

    })

    describe('Trunk', () => {
        const {Trunk} = Plant
        it('', () => {
            let trunk = new Trunk()
            expect(trunk.sides.length).to.be.within(1, 10)
        })
    })
})