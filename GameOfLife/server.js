const { ifError } = require('assert')
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

framerate = 10

grassArr = []
sheepArr = []
wolfArr = []
//predatorArr = []
//zombieArr = []

arraysOfCells = [grassArr, sheepArr, wolfArr]

Grass = require("./Grass")
Sheep = require("./Sheep")
Wolf = require("./Wolf")
//Predator = require("./Predator")
//Zombie = require("./Zombie")

matrix = []
createMatrix()

function getRandomIntegerFrom(min, max) 
{
    return Math.floor(Math.random() * (max - min) + min)
}

function createMatrix()
{
    for (let y = 0; y < 20; y++) 
    {
        matrix[y] = []
        for (let x = 0; x < 20; x++) matrix[y][x] = 0
    }   

    io.sockets.emit('send matrix', matrix)
}

function createEmpty(x, y)
{
    if (matrix[y][x] == 0) return

    outerLoop:
    for(let i in arraysOfCells)
        for(let j in arraysOfCells[i])
        {
            let cellIndexCoincides = arraysOfCells[i][j].index == matrix[y][x]
            let cellPositionCoinCides = arraysOfCells[i][j].x == x && arraysOfCells[i][j].y == y
            if(cellIndexCoincides && cellPositionCoinCides) 
            {
                arraysOfCells[i].splice(j, 1)
                break outerLoop
            }
                
        }

    matrix[y][x] = 0
}

function createGrass(x, y)
{
    matrix[y][x] = 1
    grassArr.push(new Grass(x, y))
}

function createSheep(x, y)
{
    matrix[y][x] = 2
    sheepArr.push(new Sheep(x, y))
}

function createWolf(x, y)
{
    matrix[y][x] = 3
    wolfArr.push(new Wolf(x, y))
}

function createPredator(x, y)
{
    matrix[y][x] = 4
    predatorArr.push(new Predator(x, y))
}

function createZombie(x, y)
{
    matrix[y][x] = 5
    zombieArr.push(new Zombie(x, y))
}

function destroyAll()
{
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            createEmpty(x, y)
}

function destroyGrass()
{
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            if(matrix[y][x] == 1) createEmpty(x, y)
}

function destroySheep()
{
    sheepArr = []
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            if(matrix[y][x] == 2) createEmpty(x, y)
}

function destroyWolf()
{
    wolfArr = []
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            if(matrix[y][x] == 3) createEmpty(x, y)
}

function destroyPredator()
{
    predatorArr = []
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            if(matrix[y][x] == 4) createEmpty(x, y)
}

function destroyZombie()
{
    zombieArr = []
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            if(matrix[y][x] == 5) createEmpty(x, y)
}

function doActionsOfLivingCreatures()
{
    for (let i in grassArr) 
    {
        grassArr[i].mult()
    }

    for (let i in sheepArr) 
    {
        sheepArr[i].eat()
        sheepArr[i].move()
        sheepArr[i].mult()
        sheepArr[i].die()
    }

    for (let i in wolfArr) 
    {
        wolfArr[i].eat()
        wolfArr[i].move()
        wolfArr[i].mult()
        wolfArr[i].die()
    }

    /*for (let i in predatorArr) 
    {
        predatorArr[i].eat()
        predatorArr[i].move()
        predatorArr[i].mult()
        predatorArr[i].die()
    }

    for (let i in zombieArr) 
    {
        zombieArr[i].eat()
        zombieArr[i].move()
        zombieArr[i].mult()
        zombieArr[i].die()
    }*/

    io.sockets.emit("send matrix", matrix)
}

setInterval(doActionsOfLivingCreatures, 1000 / framerate)

function generateCells()
{
    for (let y = 0; y < 20; y++) 
    {
        for (let x = 0; x < 20; x++) 
        {
            let randomNumber = getRandomIntegerFrom(1, 4)

            if (randomNumber == 1) createGrass(x, y)
            else if (randomNumber == 2) createSheep(x, y)
            else if (randomNumber == 3) createWolf(x, y)
            //else if (randomNumber == 4) createPredator(x, y)
            //else if (randomNumber == 5) createZombie(x, y)
        }
    }   
    
    io.sockets.emit("send matrix", matrix)
}

function killCell(cellType) 
{
    if (cellType == "all of them")   destroyAll()
    else if (cellType == "grass")    destroyGrass()
    else if (cellType == "sheep")    destroySheep()
    else if (cellType == "wolf")     destroyWolf()
    else if (cellType == "predator") destroyPredator()
    else if (cellType == "zombie")   destroyZombie()

    io.sockets.emit("send matrix", matrix)
}

function addCell(cellType)
{
    let cellCount = 7;
    for (let i = 0; i < cellCount; i++) 
    {
    let randomX = Math.floor(Math.random() * matrix[0].length)
    let randomY = Math.floor(Math.random() * matrix.length)

        if (matrix[randomY][randomX] == 0) 
        {
            if(cellType == "all of them")    generateCells()
            else if(cellType == "grass")     createGrass(randomX, randomY)
            else if(cellType == "sheep")     createSheep(randomX, randomY)
            else if(cellType == "wolf")      createWolf(randomX, randomY)
            //else if(cellType == "predator")  createWolf(randomX, randomY)
            //else if(cellType == "zombie")    createZombie(randomX, randomY)
        }
    }
    
    io.sockets.emit("send matrix", matrix)
}

io.on('connection', (socket) =>
{
    createMatrix()
    socket.on("kill", killCell)
    socket.on("add", addCell)
});
