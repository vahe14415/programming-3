var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (request, respons) {
    respons.redirect("index.html");
});

server.listen(3000, () => {
    console.log('Connected');
});

let framerate = 10;

grassArr = [];
sheepArr = [];
wolfArr = [];
//predatorArr = [];
//zombieArr = [];

Grass = require("./Grass");
Sheep = require("./Sheep");
Wolf = require("./Wolf");
//Predator = require("./Predator");
//Zombie = require("./Zombie");

matrix = [];

function getRandomNumberFrom(min, max) 
{
    return Math.random() * (max - min) + min;
}

function GenerateMatrix()
{
    for (let y = 0; y < 20; y++) 
    {
        matrix[y] = [];
        for (let x = 0; x < 20; x++) 
        {
            matrix[y][x] = Math.floor(getRandomNumberFrom(0, 4))
            
            /*if(y == 24 && x == 24)
            {
                matrix[y][x] = 2;
                continue;
            }
             matrix[y][x] = 0;*/
             
        }
    }   
}

GenerateMatrix();

io.sockets.emit('send matrix', matrix)

function createGrass(x, y)
{
    let gr = new Grass(x, y)
    grassArr.push(gr)
}

function createSheep(x, y)
{
    let sh = new Sheep(x, y)
    sheepArr.push(sh)
}

function createWolf(x, y)
{
    let wf = new Wolf(x, y)
    wolfArr.push(wf)
}

function createPredator(x, y)
{
    var pr = new Predator(x, y)
    predatorArr.push(pr);
}

function createZombie(x, y)
{
    var zom = new Zombie(x, y)
    zombieArr.push(zom);
}

function createObjects()
{
    for (let y = 0; y < matrix.length; y++) 
    {
        for (let x = 0; x < matrix[y].length; x++) 
        {
            if (matrix[y][x] == 1)      createGrass(x, y);
            else if (matrix[y][x] == 2) createSheep(x, y);
            else if (matrix[y][x] == 3) createWolf(x, y);
            else if (matrix[y][x] == 4) createPredator(x, y);
            else if (matrix[y][x] == 5) createZombie(x, y);
        }
    }
    io.sockets.emit('send matrix', matrix)
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

    io.sockets.emit("send matrix", matrix);
}

setInterval(doActionsOfLivingCreatures, 1000 / framerate);

function kill(cellType) 
{
    grassArr = [];
    sheepArr = [];
    wolfArr = [];
    predatorArr = [];
    zombieArr = [];
    for (let y = 0; y < matrix.length; y++) 
        for (let x = 0; x < matrix[y].length; x++) 
        {
            if(cellType == "all of them")
            {
                grassArr = [];
                sheepArr = [];
                wolfArr = [];
                predatorArr = [];
                zombieArr = [];
                matrix[y][x] = 0;
            }
        }
         
    io.sockets.emit("send matrix", matrix);
}

function addCell(cellType)
{
    for (let i = 0; i < 7; i++) 
    {
    let x = Math.floor(Math.random() * matrix[0].length)
    let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) 
        {
            if(cellType == "grass")
            {
                matrix[y][x] = 1
                createGrass(x, y)
            }
            else if(cellType == "sheep")
            {
                matrix[y][x] = 2
                createSheep(x, y)
            }
            else if(cellType == "wolf")
            {
                matrix[y][x] = 3
                createWolf(x, y)
            }
        }
    }
    
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) 
{
    createObjects();
    socket.on("kill all of them", (data) => kill(data));
    socket.on("add grass", (data) => addCell(data));
    socket.on("add sheep", (data) => addCell(data));
    socket.on("add wolf", (data) => addCell(data));
});
