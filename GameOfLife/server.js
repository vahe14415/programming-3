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
module.exports.matrixSize = 20

grassArr = []
sheepArr = []
wolfArr = []
//predatorArr = []
//zombieArr = []

Grass = require("./Grass")
Sheep = require("./Sheep")
Wolf = require("./Wolf")
//Predator = require("./Predator")
//Zombie = require("./Zombie")

matrix = []

function getRandomNumberFrom(min, max) 
{
    return Math.random() * (max - min) + min
}

function generateMatrix()
{
    for (let y = 0; y < matrixSize; y++) 
    {
        matrix[y] = []
        for (let x = 0; x < matrixSize; x++) 
        {
            let randomNumber = Math.floor(getRandomNumberFrom(0, 4))

            if (randomNumber == 0)      createEmpty(x, y)
            else if (randomNumber == 1) createGrass(x, y)
            else if (randomNumber == 2) createSheep(x, y)
            else if (randomNumber == 3) createWolf(x, y)
            //else if (randomNumber == 4) createPredator(x, y)
            //else if (randomNumber == 5) createZombie(x, y)
        }
    }   

    io.sockets.emit('send matrix', matrix)
}

generateMatrix();

function createEmpty(x, y)
{
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

function kill(cellType) 
{
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
        {
            if(cellType == "all of them")
            {
                grassArr = []
                sheepArr = []
                wolfArr = []
                predatorArr = []
                zombieArr = []
                matrix[y][x] = 0
            }
        }
         
    io.sockets.emit("send matrix", matrix)
}

function addCell(cellType)
{
    for (let i = 0; i < 7; i++) 
    {
    let x = Math.floor(Math.random() * matrix[0].length)
    let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) 
        {
            if(cellType == "all of them")    generateMatrix()
            else if(cellType == "grass")     createGrass(x, y)
            else if(cellType == "sheep")     createSheep(x, y)
            else if(cellType == "wolf")      createWolf(x, y)
            //else if(cellType == "predator")  createWolf(x, y)
            //else if(cellType == "zombie")    createZombie(x, y)
        }
    }
    
    io.sockets.emit("send matrix", matrix)
}

io.on('connection', function (socket) 
{
    generateMatrix()
    socket.on("kill all of them", (data) => kill(data))
    socket.on("add all of them", (data) =>  addCell(data))
    socket.on("add grass", (data) =>        addCell(data))
    socket.on("add sheep", (data) =>        addCell(data))
    socket.on("add wolf", (data) =>         addCell(data))
});
