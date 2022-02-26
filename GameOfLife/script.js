var socket = io();
var cellSide = 8;

function setup() {
    createCanvas(100 * cellSide, 100 * cellSide);
    background('#acacac');
}

function drawMatrix(matrix) {
    for (var y = 0; y < 100; y++) 
    {
        for (var x = 0; x < 100; x++) 
        {
            if (matrix[y][x] == 1) 
            {
                stroke("black");
                fill("green");
            }
            else if (matrix[y][x] == 2) 
            {
                stroke("black");
                fill("yellow");
            }
            else if (matrix[y][x] == 0) 
            {
                noStroke();
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) 
            {
                stroke("black");
                fill("orange");
            }
            else if (matrix[y][x] == 4) 
            {
                stroke("black");
                fill("red");
            }

            else if (matrix[y][x] == 5) 
            {
                stroke("red");
                fill("black");
            }

            rect(x * cellSide, y * cellSide, cellSide, cellSide)
        }
    }
}

setInterval
(
    function () 
    {
        socket.on('send matrix', drawMatrix)
    }, 1000
)







