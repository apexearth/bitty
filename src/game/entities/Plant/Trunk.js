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
        let count = Math.floor(Math.random() * 53 + 5)
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
        graphics.beginFill(0xffffff, .5)
        for (let i = 0; i < this.sides.length; i++) {
            let side   = this.sides[i]
            let coords = {
                left : {x: cos(side.left), y: sin(side.left)},
                right: {x: cos(side.right), y: sin(side.right)}
            }
            graphics.moveTo(coords.left.x, coords.left.y)
            graphics.lineTo(coords.right.x, coords.right.y)
            this.drawBranch(seconds, graphics, coords, side.branch)
        }
        graphics.endFill()
    }

    createBranch(parent, children = 1, descendants = Math.floor(Math.random() * 5 + 5)) {
        let branch = {
            length   : 20 + Math.random() * 30,
            angle    : parent.angle + Math.random() * Math.PI * .2 - Math.PI * .1,
            thickness: .95, // fix me! I'm really a .5 to 1 value :)
            branches : [],
            descendants
        }
        for (let i = 0; i < children && descendants; i++) {
            branch.branches.push(this.createBranch(branch, 1, descendants - 1))
        }
        return branch
    }

    drawBranch(seconds, graphics, coords, branch) {
        // Force a point if no children (temporary)
        if (branch.branches.length === 0)
            branch.thickness = .5

        branch.angle  = branch.angle + (1 - Math.random() * 2) * seconds
        branch.length = branch.length + (1 - Math.random() * 2) * seconds

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
        graphics.moveTo(coords.left.x, coords.left.y)
        graphics.lineTo(endCoords.left.x, endCoords.left.y)
        graphics.moveTo(coords.right.x, coords.right.y)
        graphics.lineTo(endCoords.right.x, endCoords.right.y)

        branch.branches.forEach(branch => this.drawBranch(seconds, graphics, endCoords, branch))
    }
}

module.exports = Trunk