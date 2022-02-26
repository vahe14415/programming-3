var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, () => {
    console.log('Connected');
});

matrix = [];

function getRandomNumberFrom(min, max) 
{
    return Math.random() * (max - min) + min;
}

function GenerateMatrix()
{
    for (let y = 0; y < 100; y++) 
    {
        matrix[y] = [];
        for (let x = 0; x < 100; x++) 
        {
            //matrix[y][x] = Math.floor(getRandomNumberFrom(0, 2))
            if(y == 0 && x == 0)
            {
                matrix[y][x] = 1;
                continue;
            }
             matrix[y][x] = 0;
        }
    }   
}

GenerateMatrix();

io.sockets.emit('send matrix', matrix)

grassArr = [];
sheepArr = [];
wolfArr = [];
predatorArr = [];
zombieArr = [];

Grass = require("./Grass");
Sheep = require("./Sheep");
Wolf = require("./Wolf");
Predator = require("./Predator");
Zombie = require("./Zombie");

function createObject(matrix)
{
    for (var y = 0; y < matrix.length; y++) 
    {
        for (var x = 0; x < matrix[y].length; x++) 
        {
            if (matrix[y][x] == 1) 
            {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) 
            {
                var sh = new Sheep(x, y)
                sheepArr.push(sh)
            }
            else if (matrix[y][x] == 3) 
            {
                var wf = new Wolf(x, y)
                wolfArr.push(wf)
            }
            else if (matrix[y][x] == 4) 
            {
                var pr = new Predator(x, y)
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 5) 
            {
                var zom = new Zombie(x, y)
                zombieArr.push(zom);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function doActionsOfLivingCreatures()
{
    for (var i in grassArr) 
    {
        grassArr[i].mult()
    }

    /*for (var i in sheepArr) 
    {
        sheepArr[i].eat()
        sheepArr[i].move()
        sheepArr[i].mult()
        sheepArr[i].die()
    }

    for (var i in wolfArr) 
    {
        wolfArr[i].eat()
        wolfArr[i].move()
        wolfArr[i].mult()
        wolfArr[i].die()
    }

    for (var i in predatorArr) 
    {
        predatorArr[i].eat()
        predatorArr[i].move()
        predatorArr[i].mult()
        predatorArr[i].die()
    }

    for (var i in zombieArr) 
    {
        zombieArr[i].eat()
        zombieArr[i].move()
        zombieArr[i].mult()
        zombieArr[i].die()
    }*/

    io.sockets.emit("send matrix", matrix);
}

setInterval(doActionsOfLivingCreatures, 1000);

io.on('connection', function () 
{
    createObject(matrix)
});
