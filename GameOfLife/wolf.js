let LivingCreature = require('./LivingCreature')

module.exports = class Wolf extends LivingCreature
{
    constructor(x, y) 
    {
        super(x, y)
        this.energy = 20
    }

    mult() 
    {
        let emptyCells = super.chooseCell([0], this.directions3x3)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (emptyCell && this.energy > 50) 
        {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newY][newX] = 3
            let newWolf = new Wolf(newX, newY)
            wolfArray.push(newWolf)
            this.energy = 20
        }
    }

    move() 
    {
        let cells = super.chooseCell([0, 1], this.directions3x3)
        let cell = cells[Math.floor(Math.random() * cells.length)]
        if (cell) 
        {
            let newX = cell[0]
            let newY = cell[1]
            matrix[this.y][this.x] = matrix[newY][newX]
            matrix[newY][newX] = 3

            if (matrix[newY][newX] == 1)
                for (let i in grassArray)
                    if (grassArray[i].x == newX && grassArray[i].y == newY)
                        grassArray.splice(i, 1)    

            this.energy--
            this.x = newX
            this.y = newY
        }
    }

    eat() 
    {
        let foods = super.chooseCell([2], this.directions3x3)
        let food = foods[Math.floor(Math.random() * foods.length)]
        if (food) 
        {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in sheepArray) 
                if (sheepArray[i].x == newX && sheepArray[i].y == newY) 
                    sheepArray.splice(i, 1)

            this.x = newX
            this.y = newY
            this.energy += 10
        }
    }

    die() 
    {
        if (this.energy <= 0) 
        {
            matrix[this.y][this.x] = 0
            for (var i in wolfArray) 
                if (wolfArray[i].x == this.x && wolfArray[i].y == this.y) 
                    wolfArray.splice(i, 1)
        }
    }
    
}
