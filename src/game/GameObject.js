const {AppObject} = require("../../../apex-app")

class GameObject extends AppObject {
    constructor(options) {
        super(options)

        this.draw()
    }

    draw() {
        if (typeof window === 'undefined') return
        this.graphics.beginFill(0xffffff, 1)
        this.graphics.drawRect(0, 0, 10, 10)
        this.graphics.endFill()
    }
}

module.exports = GameObject