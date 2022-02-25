var socket = io();

var side = 8;
var grassArr = [];
var sheepArr = [];
var wolfArr = [];
var predatorArr = [];
var zombieArr = [];

function setup() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }

            else if (matrix[y][x] == 2) {

                var sh = new Sheep(x, y)
                sheepArr.push(sh)
            }

            else if (matrix[y][x] == 3) {

                var wf = new Wolf(x, y)
                wolfArr.push(wf)
            }

            else if (matrix[y][x] == 4) {
                var pr = new Predator(x, y)
                predatorArr.push(pr);
            }

            else if (matrix[y][x] == 5) {
                var zom = new Zombie(x, y)
                zombieArr.push(zom);
            }


        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}




function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                stroke("black");
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                stroke("black");
                fill("yellow");
            }
            else if (matrix[y][x] == 0) {
                noStroke();
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                stroke("black");
                fill("orange");
            }
            else if (matrix[y][x] == 4) {
                stroke("black");
                fill("red");
            }

            else if (matrix[y][x] == 5) {
                stroke("white");
                fill("black");
            }

            rect(x * side, y * side, side, side)
        }
    }

    for (var i in grassArr) {
        grassArr[i].mult()
    }


    for (var i in sheepArr) {
        sheepArr[i].eat()
        sheepArr[i].move()
        sheepArr[i].mult()
        sheepArr[i].die()
    }

    for (var i in wolfArr) {
        wolfArr[i].eat()
        wolfArr[i].move()
        wolfArr[i].mult()
        wolfArr[i].die()
    }

    for (var i in predatorArr) {
        predatorArr[i].eat()
        predatorArr[i].move()
        predatorArr[i].mult()
        predatorArr[i].die()
    }


    for (var i in zombieArr) {
        zombieArr[i].eat()
        zombieArr[i].move()
        zombieArr[i].mult()
        zombieArr[i].die()
    }

}







