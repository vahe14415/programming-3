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

let framerate = 2.5
let defaultMatrixSize = 30

grassArray = []
sheepArray = []
wolfArray = []
//predatorArray = []
//zombieArray = []

setInterval(() => 
{
    console.log("----------------------------")
    console.log("grass: " + grassArray.length)
    console.log("sheep: " + sheepArray.length)
    console.log("wolf: " + wolfArray.length)
    console.log("cells:" + (grassArray.length + sheepArray.length + wolfArray.length))
    console.log("----------------------------")
},1000)

Grass = require("./grass")
Sheep = require("./sheep")
Wolf = require("./wolf")
//Predator = require("./Predator")
//Zombie = require("./Zombie")

matrix = []
createMatrix()

function restart(matrixSize)
{
    defaultMatrixSize = matrixSize
    for(let i = 1; i <= 5; i++)
            destroy(i)

    createMatrix()
}

function getRandomIntegerFrom(min, max) 
{
    return Math.floor(Math.random() * (max - min) + min)
}

function createMatrix()
{
    matrix = []
    for (let y = 0; y < defaultMatrixSize; y++) 
    {
        matrix[y] = []
        for (let x = 0; x < defaultMatrixSize; x++) create(x, y, 0)
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
            if (matrix[y][x] == cellIndex) create(x, y, 0)
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

    /*for (let i in predatorArray) 
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
    }*/

    io.sockets.emit("send matrix", matrix)
}

setInterval(doActionsOfLivingCreatures, 1000 / framerate)

function generateCells()
{
    for(let i = 1; i <= 5; i++)
            destroy(i)

    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
            create(x, y, getRandomIntegerFrom(1, 4))
}

function killCell(cellType) 
{
    if (cellType == "all of them")
        for(let i = 1; i <= 5; i++)
            destroy(i)
    else if (cellType == "grass")    destroy(1)
    else if (cellType == "sheep")    destroy(2)
    else if (cellType == "wolf")     destroy(3)
    else if (cellType == "predator") destroy(4)
    else if (cellType == "zombie")   destroy(5)

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
            else if(cellType == "grass")     create(randomX, randomY, 1)
            else if(cellType == "sheep")     create(randomX, randomY, 2)
            else if(cellType == "wolf")      create(randomX, randomY, 3)
            //else if(cellType == "predator")  create(randomX, randomY, 4)
            //else if(cellType == "zombie")    create(randomX, randomY, 5)
        }
    }
    
    io.sockets.emit("send matrix", matrix)
}

io.on('connection', (socket) =>
{
    createMatrix()
    socket.on("restart", restart)
    socket.on("kill", killCell)
    socket.on("add", addCell)
});
