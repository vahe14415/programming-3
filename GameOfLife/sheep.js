let LivingCreature = require('./LivingCreature')

module.exports = class Sheep extends LivingCreature
{
    constructor(x, y, index) 
    {
        super(x, y)
        this.index = 2
        this.energy = 5
    }

    mult() 
    {
        var emptyCells = super.chooseCell([0], this.directions3x3)
        var emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (emptyCell && this.energy > 6) 
        {
            var newX = emptyCell[0]
            var newY = emptyCell[1]
            matrix[newY][newX] = 2
            var xt = new Sheep(newX, newY)
            sheepArray.push(xt)
            this.energy = 5
        }
    }

    move() 
    {
        let emptyCells = super.chooseCell([0], this.directions3x3)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        this.energy--
        if (emptyCell) 
        {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    eat() 
    {
        let foods = super.chooseCell([1], this.directions3x3)
        let food = foods[Math.floor(Math.random() * foods.length)]
        if (food) 
        {
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            for (let i in grassArray) 
                if (grassArray[i].x == newX && grassArray[i].y == newY) 
                    grassArray.splice(i, 1)

            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }

    die() 
    {
        if (this.energy <= 0) 
        {
            matrix[this.y][this.x] = 0
            for (var i in sheepArray) 
                if (sheepArray[i].x == this.x && sheepArray[i].y == this.y) 
                    sheepArray.splice(i, 1)
        }
    }

}