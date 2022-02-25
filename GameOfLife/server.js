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

let matrix = [];

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let y = 0; y < 100; y++) {
    matrix[y] = [];
    for (let x = 0; x < 100; x++) {
        //matrix[y][x] = random([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5]);
        matrix[y][x] = Math.floor(randomRange(0, 5))
    }
}

io.sockets.emit('send matrix', matrix)

var grassArr = [];
var sheepArr = [];
var wolfArr = [];
var predatorArr = [];
var zombieArr = [];

Grass = require("./Grass")
Sheep = require("./Sheep")
Wolf = require("./Wolf")
Predator = require("./Predator")
Zombie = require("./Zombie")