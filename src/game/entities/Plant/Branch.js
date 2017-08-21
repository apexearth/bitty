class Branch {
    constructor({
                    trunk,
                    parent,
                    children = 1,
                    limitDecendants = 1,
                    length = .1
                }) {
        this.trunk    = trunk
        this.parent   = parent
        this.length   = length
        this.angle    = parent.angle + Math.random() * Math.PI * .4 - Math.PI * .2
        this.branches = []
        this.energy   = 0

        trunk.branchCount += 1

        for (let i = 0; i < children && limitDecendants; i++) {
            this.branches.push(new Branch({
                trunk          : this.trunk,
                parent         : this,
                children       : 1 + Math.round(Math.random()),
                limitDecendants: limitDecendants - 1
            }))
        }
        return this
    }

    update(seconds) {
        let growSelf = this.length < 20
        if (growSelf) {
            this.length += this.energy / (this.branches.length + 1)
        }
        if (this.branches.length < 2 && (this.length >= 20 || Math.random() < .005 * seconds)) {
            this.branches.push(new Branch({
                trunk : this.trunk,
                parent: this
            }))
        }
        this.branches.forEach(branch => {
            branch.energy += this.energy / (this.branches.length + (growSelf ? 1 : 0))
            branch.update(seconds)
        })
        this.energy = 0
    }

    draw(seconds, graphics, coords) {
        let thickness = .95

        let midpointLeft  = {
            x: (coords.left.x * thickness + coords.right.x * (1 - thickness)),
            y: (coords.left.y * thickness + coords.right.y * (1 - thickness))
        }
        let midpointRight = {
            x: (coords.left.x * (1 - thickness) + coords.right.x * thickness),
            y: (coords.left.y * (1 - thickness) + coords.right.y * thickness)
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

        graphics.lineStyle(1, 0xffffff, .75)
        graphics.beginFill(0xffffff, .5)
        graphics.moveTo(coords.left.x, coords.left.y)
        graphics.lineTo(endCoords.left.x, endCoords.left.y)
        graphics.lineTo(endCoords.right.x, endCoords.right.y)
        graphics.lineTo(coords.right.x, coords.right.y)
        graphics.endFill()

        this.branches.forEach(branch => branch.draw(seconds, graphics, endCoords))
    }
}

module.exports = Branch