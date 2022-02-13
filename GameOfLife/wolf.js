class Wolf extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
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

    chooseCell_1(character, character1) {
        this.getNewDirections()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                } else if (matrix[y][x] == character1) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;

    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var wf = new Wolf(newX, newY)
            wolfArr.push(wf)
            this.energy = 10;
        }
    }

    move() {

        var empty = random(this.chooseCell_1(0, 1))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]

            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0
            }
            else {
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1
            }
            this.energy -= 2;
            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in sheepArr) {
                if (sheepArr[i].x === newX && sheepArr[i].y === newY) {
                    sheepArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 5;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in wolfArr) {
                if (wolfArr[i].x === this.x && wolfArr[i].y === this.y) {
                    wolfArr.splice(i, 1)
                }
            }
        }
    }
}
