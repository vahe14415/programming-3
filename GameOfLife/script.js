const socket = io()

let matrixSize = 30
const canvasSize = 915
let cellSide = canvasSize / matrixSize

function setup() 
{
    createCanvas(canvasSize, canvasSize)
    background('#acacac')
}

function drawMatrix(matrix) 
{
    for (var y = 0; y < matrixSize; y++) 
    {
        for (var x = 0; x < matrixSize; x++) 
        {
            if (matrix[y][x] == 0) 
            {
                noStroke()
                fill('#acacac')
            }
            else if (matrix[y][x] == 1) 
            {
                stroke("black")
                if(season == "spring") fill("#00FF00")
                else if (season == "summer") fill("#00FF64")
                else if (season == "autumn") fill("#596B00")
                else if (season == "winter") fill("white")
            }
            else if (matrix[y][x] == 2) 
            {
                stroke("black")
                fill("yellow")
            }
            else if (matrix[y][x] == 3) 
            {
                stroke("black")
                fill("orange")
            }
            else if (matrix[y][x] == 4) 
            {
                stroke("black")
                fill("red")
            }
            else if (matrix[y][x] == 5) 
            {
                stroke("red")
                fill("black")
            }

            rect(x * cellSide, y * cellSide, cellSide, cellSide)
        }
    }
}

socket.on('send matrix', drawMatrix)

function changeCanvasSize(size)
{
    matrixSize = size
    cellSide = canvasSize / matrixSize
    socket.emit("change canvas size", size)
}

function killCell(cellType) 
{
    socket.emit("kill", cellType)
}

function addCell(cellType) 
{
    socket.emit("add", cellType)
}


