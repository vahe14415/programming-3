class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 30;
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

    chooseCell(character) {
        this.getNewDirections()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;

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

        }
        return found;

    }




    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 50) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var zb = new Zombie(newX, newY)
            zombieArr.push(zb)
            this.energy = 50;
        }
    }

    move() {
        var empty = random(this.chooseCell_1(0, 1))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]

            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 0
            }

            else {
                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 1
            }


            this.energy -= 10;
            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var food = random(this.chooseCell(4))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            for (var i in predatorArr) {
                if (predatorArr[i].x === newX && predatorArr[i].y === newY) {
                    predatorArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 11;
        }
    }


           


    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0
            for (var i in zombieArr) {
                if (zombieArr[i].x == this.x && zombieArr[i].y == this.y) {
                    zombieArr.splice(i, 1)
                }
            }
        }
    }
}







