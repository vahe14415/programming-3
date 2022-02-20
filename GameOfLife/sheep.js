let LivingCreature = require('./LivingCreature')

module.exports = class Sheep extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
        this.directions = [];

    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 6) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var xt = new Sheep(newX, newY)
            sheepArr.push(xt)
            this.energy = 5;
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 1.5;
        }
    }

    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0
            for (var i in sheepArr) {
                if (sheepArr[i].x == this.x && sheepArr[i].y == this.y) {
                    sheepArr.splice(i, 1)
                }
            }
        }
    }
}