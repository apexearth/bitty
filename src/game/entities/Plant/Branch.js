class Branch {
    constructor({
                    parent,
                    children,
                    descendants,
                    length = 20
                }) {
        this.length      = length + Math.random() * 20
        this.angle       = parent.angle + Math.random() * Math.PI * .5 - Math.PI * .25
        this.thickness   = .90 // fix me! I'm really a .5 to 1 value :)
        this.branches    = []
        this.descendants = descendants

        for (let i = 0; i < children && descendants; i++) {
            this.branches.push(new Branch({
                parent     : this,
                children   : 1 + Math.round(Math.random()),
                descendants: descendants - 1
            }))
        }
        return this
    }

    draw(seconds, graphics, coords) {
        // Force a point if no children (temporary)
        if (this.branches.length === 0)
            this.thickness = .5

        let midpointLeft  = {
            x: (coords.left.x * this.thickness + coords.right.x * (1 - this.thickness)),
            y: (coords.left.y * this.thickness + coords.right.y * (1 - this.thickness))
        }
        let midpointRight = {
            x: (coords.left.x * (1 - this.thickness) + coords.right.x * this.thickness),
            y: (coords.left.y * (1 - this.thickness) + coords.right.y * this.thickness)
        }
        let endCoords     = {
            left : {
                x: midpointLeft.x + Math.cos(this.angle) * this.length,
                y: midpointLeft.y + Math.sin(this.angle) * this.length
            },
            right: {
                x: midpointRight.x + Math.cos(this.angle) * this.length,
                y: midpointRight.y + Math.sin(this.angle) * this.length
            }
        }
        graphics.moveTo(coords.left.x, coords.left.y)
        graphics.lineTo(endCoords.left.x, endCoords.left.y)
        graphics.moveTo(coords.right.x, coords.right.y)
        graphics.lineTo(endCoords.right.x, endCoords.right.y)

        this.branches.forEach(branch => branch.draw(seconds, graphics, endCoords))
    }
}

module.exports = Branch