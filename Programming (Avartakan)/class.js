class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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

    chooseCell(character) {
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

    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 1) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
        }
    }
}



class Sheep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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



class Wolf {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index
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



class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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








