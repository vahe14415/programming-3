var socket = io();
var cellSide = 45;

function setup() {
    createCanvas(20 * cellSide, 20 * cellSide);
    background('#acacac');
}

function drawMatrix(matrix) {
    for (var y = 0; y < 20; y++) 
    {
        for (var x = 0; x < 20; x++) 
        {
            if (matrix[y][x] == 0) 
            {
                noStroke();
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) 
            {
                stroke("black");
                fill("green");
            }
            else if (matrix[y][x] == 2) 
            {
                stroke("black");
                fill("yellow");
            }
            else if (matrix[y][x] == 3) 
            {
                stroke("black");
                fill("orange");
            }
            /*else if (matrix[y][x] == 4) 
            {
                stroke("black");
                fill("red");
            }

            else if (matrix[y][x] == 5) 
            {
                stroke("red");
                fill("black");
            }*/

            rect(x * cellSide, y * cellSide, cellSide, cellSide)
        }
    }
}

socket.on('send matrix', drawMatrix)

function kill(cellType) 
{
    socket.emit("kill " + cellType, cellType)
}

function addCell(cellType) 
{
    socket.emit("add cell", cellType)
}





