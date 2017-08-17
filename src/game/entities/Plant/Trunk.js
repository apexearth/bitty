class Trunk {
    constructor() {
        this.size   = 10 + Math.random() * 30
        this._sides = this.createSides()
    }


    get sides() {
        return this._sides
    }

    createSides() {
        let sides = []
        let count = Math.floor(Math.random() * 5 + 5)
        for (let i = 0; i < count; i++) {
            sides.push(this.createSide(count, i))
        }
        return sides
    }

    createSide(count, i) {
        let side    = {
            left : Math.PI * 2 / count * i,
            right: Math.PI * 2 / count * (i + 1),
            angle: Math.PI * 2 / count * (i + .5), // Angle is the midpoint, representing direction.
        }
        side.branch = this.createBranch(side)
        return side
    }

    draw(seconds, graphics) {
        let radius = this.size
        const cos  = x => Math.cos(x) * radius
        const sin  = y => Math.sin(y) * radius
        graphics.lineStyle(1, 0xffffff, .75)
        for (let i = 0; i < this.sides.length; i++) {
            let side   = this.sides[i]
            let coords = {
                left : {x: cos(side.left), y: sin(side.left)},
                right: {x: cos(side.right), y: sin(side.right)}
            }
            graphics.moveTo(coords.left.x, coords.left.y)
            graphics.lineTo(coords.right.x, coords.right.y)
            this.drawBranch(graphics, coords, side.branch)
        }
        graphics.endFill()
    }

    createBranch(parent, children = 1, descendants = 5) {
        let branch = {
            length   : 20,
            angle    : parent.angle + Math.PI * .05,
            thickness: .95, // fix me! I'm really a .5 to 1 value :)
            branches : [],
            descendants
        }
        for (let i = 0; i < children && descendants; i++) {
            branch.branches.push(this.createBranch(branch, 1, descendants - 1))
        }
        return branch
    }

    drawBranch(graphics, coords, branch) {
        // Force a point if no children (temporary)
        if (branch.branches.length === 0)
            branch.thickness = .5

        let midpointLeft  = {
            x: (coords.left.x * branch.thickness + coords.right.x * (1 - branch.thickness)),
            y: (coords.left.y * branch.thickness + coords.right.y * (1 - branch.thickness))
        }
        let midpointRight = {
            x: (coords.left.x * (1 - branch.thickness) + coords.right.x * branch.thickness),
            y: (coords.left.y * (1 - branch.thickness) + coords.right.y * branch.thickness)
        }
        let endCoords     = {
            left : {
                x: midpointLeft.x + Math.cos(branch.angle) * branch.length,
                y: midpointLeft.y + Math.sin(branch.angle) * branch.length
            },
            right: {
                x: midpointRight.x + Math.cos(branch.angle) * branch.length,
                y: midpointRight.y + Math.sin(branch.angle) * branch.length
            }
        }
        graphics.lineStyle(1, 0xffffff, .75)
        graphics.moveTo(coords.left.x, coords.left.y)
        graphics.lineTo(endCoords.left.x, endCoords.left.y)
        graphics.moveTo(coords.right.x, coords.right.y)
        graphics.lineTo(endCoords.right.x, endCoords.right.y)

        branch.branches.forEach(branch => this.drawBranch(graphics, endCoords, branch))
        graphics.endFill()
    }
}

module.exports = Trunk