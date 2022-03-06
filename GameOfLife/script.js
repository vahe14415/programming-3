const socket = io()

let canvasSize = 900
let matrixSize = 30
let cellSide = 30

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
                fill("green")
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
            /*else if (matrix[y][x] == 4) 
            {
                stroke("black")
                fill("red")
            }
            else if (matrix[y][x] == 5) 
            {
                stroke("red")
                fill("black")
            }*/

            rect(x * cellSide, y * cellSide, cellSide, cellSide)
        }
    }
}

socket.on('send matrix', drawMatrix)

function restart()
{
    console.log("ooooh my!!!")
    //matrixSize = form.querySelector('[name="matrixSize"]').value
    //console.log(matrixSize)
    //cellSide = canvasSize / matrixSize
    //socket.emit('restart', matrixSize)
}

/*function changeCanvasSize(size){
    matrixSize = size
    socket.emit('change')
}*/

function killCell(cellType) 
{
    socket.emit("kill", cellType)
}

function addCell(cellType) 
{
    socket.emit("add", cellType)
}


