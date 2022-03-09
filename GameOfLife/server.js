const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const fs = require("fs")

app.use(express.static("."))

app.get("/", function (request, respons) {
    respons.redirect("index.html")
});

server.listen(3000, () => {
    console.log('Connected')
});

let framerate = 5
let matrixSize = 30

grassArray = []
sheepArray = []
wolfArray = []
predatorArray = []
zombieArray = []

Grass = require("./grass")
Sheep = require("./sheep")
Wolf = require("./wolf")
Predator = require("./predator")
Zombie = require("./zombie")

matrix = []
season = "spring"
createMatrix()

function restart()
{
    for(let i = 1; i <= 5; i++) destroy(i)
    createMatrix()
}

function getRandomIntegerFrom(min, max) 
{
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomFrom(array)
{
    return array[getRandomIntegerFrom(0, array.length)]
}

/*
    Այս ֆունկցիան ավելացրել եմ, որպեսզի խոտերի քանակը (grassArray-ի երկարությունը)
    մեծ չլինի մատրիցաի քառակուսիների քանակից։
    Նաև այնպես է լինում որ խոտերի քանակը փոքր է լինում 
    մատրիքսի քառակուսիների քանակից, չնայած ամբողջ մատրիցան լցված է խոտերով։
    
    Այս ֆունկցիան կանչել եմ 146 տողում
*/
function clampArray(array)
{
    if(array.length > matrixSize * matrixSize)
        for(let i in array)
        {
            array.splice(i, 1)
            if (array.length > matrixSize * matrixSize) continue
            else break          
        }
}

function createMatrix()
{
    matrix = []
    for (let y = 0; y < matrixSize; y++) 
    {
        matrix[y] = []
        for (let x = 0; x < matrixSize; x++) create(x, y, 0)
    }   

    io.sockets.emit('send matrix', matrix)
}

function create(x, y, cellIndex)
{
    matrix[y][x] = cellIndex
    if      (cellIndex == 0) return
    else if (cellIndex == 1) grassArray.push(new Grass(x, y))
    else if (cellIndex == 2) sheepArray.push(new Sheep(x, y))
    else if (cellIndex == 3) wolfArray.push(new Wolf(x, y))
    else if (cellIndex == 4) predatorArray.push(new Predator(x, y))
    else if (cellIndex == 5) zombieArray.push(new Zombie(x, y))
}

function destroy(cellIndex)
{
    if      (cellIndex == 1) grassArray = []
    else if (cellIndex == 2) sheepArray = []
    else if (cellIndex == 3) wolfArray = []
    else if (cellIndex == 4) predatorArray = []
    else if (cellIndex == 5) zombieArray = []

    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            if (cellIndex == matrix[y][x]) create(x, y, 0)
}

function doActionsOfLivingCreatures()
{
    for (let i in grassArray) 
    {
        grassArray[i].mult()
    }

    for (let i in sheepArray) 
    {
        sheepArray[i].eat()
        sheepArray[i].move()
        sheepArray[i].mult()
        sheepArray[i].die()
    }

    for (let i in wolfArray) 
    {
        wolfArray[i].eat()
        wolfArray[i].move()
        wolfArray[i].mult()
        wolfArray[i].die()
    }

    for (let i in predatorArray) 
    {
        predatorArray[i].eat()
        predatorArray[i].move()
        predatorArray[i].mult()
        predatorArray[i].die()
    }

    for (let i in zombieArray) 
    {
        zombieArray[i].eat()
        zombieArray[i].move()
        zombieArray[i].mult()
        zombieArray[i].die()
    }

    io.sockets.emit("send matrix", matrix)
    io.sockets.emit("send countOfCells", statistics)
    clampArray(grassArray)
}

let gameInterval = setInterval(doActionsOfLivingCreatures, 1000 / framerate)

function refreshGameInterval()
{
    clearInterval(gameInterval)
    gameInterval = setInterval(doActionsOfLivingCreatures, 1000 / framerate)
}

function generateCells()
{
    for(let i = 1; i <= 5; i++) destroy(i)
        
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++)
            create(x, y, getRandomFrom([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,3,4,5]))
}

function killCell(cellType) 
{
    if (cellType == undefined)
        for(let i = 1; i <= 5; i++) destroy(i)
    else destroy(cellType)

    io.sockets.emit("send matrix", matrix)
}

function addCell(cellType)
{
    if(cellType == undefined)
    {
        generateCells()
        return
    }

    let cellCount = 7;
    for(let i = 0; i < cellCount; i++) 
    {
        let randomX = Math.floor(Math.random() * matrix[0].length)
        let randomY = Math.floor(Math.random() * matrix.length)
        if(matrix[randomY][randomX] == 0 || matrix[randomY][randomX] == 1) 
        {   
            //այս կոդը չգիդեմ ինչու սխալ է աշխատում 
            /*if(matrix[randomY][randomX] == 1)
                for(let j in grassArray)
                    if(grassArray[j].x == randomX && grassArray[i].y == randomY)
                        grassArray.splice(j, 1)   */

            create(randomX, randomY, cellType)         
        }
    }
    
    io.sockets.emit("send matrix", matrix)
}

io.on('connection', (socket) =>
{
    createMatrix()
    socket.on("kill", killCell)
    socket.on("add", addCell)
    socket.on("send season", (data) => season = data)
    socket.on("change canvas size", (data) => {matrixSize = data; restart()})
    socket.on("change framerate", (data) => {framerate = data; refreshGameInterval()})
})


let statistics = {}

setInterval(function() {
    statistics.grass = grassArray.length
    statistics.sheep = sheepArray.length
    statistics.wolf = wolfArray.length
    statistics.predator = predatorArray.length
    statistics.zombie = zombieArray.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), () => {})
},1000 / framerate)