let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 20;
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1]
        ]
    }

    chooseCell_1(character, character1) {
        this.getNewDirections()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i])
                }

            }
            return found;

        }

    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 20) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var pr = new Predator(newX, newY)
            predatorArr.push(pr)
            this.energy = 20;
        }
    }


    move() {
        var empty = random(this.chooseCell_1(0, 1))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]

            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0
            }

            else if(matrix[newY][newX]==1) {
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 1
            }


            this.energy -= 1;
            this.x = newX;
            this.y = newY;
        }
    }



    eat() {
        var food = random(this.chooseCell(3))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            for (var i in wolfArr) {
                if (wolfArr[i].x === newX && wolfArr[i].y === newY) {
                    wolfArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 10;
        }
    }

    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x === this.x && predatorArr[i].y === this.y) {
                    predatorArr.splice(i, 1)
                }
            }
        }
    }
}