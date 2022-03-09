let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature
{
    constructor(x, y) 
    {
        super(x, y)
        this.energy = 10
        this.directions = []
    }

    mult() 
    {
        let emptyCells = super.chooseCell([0], this.directions3x3)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (emptyCell && this.energy > 100) 
        {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newY][newX] = 4
            let newPredator = new Predator(newX, newY)
            predatorArray.push(newPredator)
            this.energy = 10
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
            matrix[newY][newX] = 4

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
        let foods = super.chooseCell([2, 3], this.directions3x3)
        let food = foods[Math.floor(Math.random() * foods.length)]
        if (food) 
        {
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            if(matrix[newY][newX] == 3)
                for (let i in wolfArray) 
                    if (wolfArray[i].x == newX && wolfArray[i].y == newY) 
                        wolfArray.splice(i, 1)
            else            
                for (let i in sheepArray) 
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
            for (var i in predatorArray) 
                if (predatorArray[i].x == this.x && predatorArray[i].y == this.y) 
                    predatorArray.splice(i, 1)
        }
    }

}