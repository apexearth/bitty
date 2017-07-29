require('./index.less')
const {App, AppObject, createRenderer} = require("../../apex-app")

class BittyApp extends App {
    constructor() {
        super()
        this.add(new AppObject({parent: this}))
        this.objects[0].graphics.beginFill(0xffffff, 1)
        this.objects[0].graphics.drawRect(0, 0, 10, 10)
        this.objects[0].graphics.endFill()
    }
}

createRenderer(new BittyApp(), {
    rendererOptions: {
        backgroundColor: 0x333333
    }
})

