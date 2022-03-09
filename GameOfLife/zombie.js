let LivingCreature = require('./LivingCreature')

module.exports = class Zombie extends LivingCreature
{
    constructor(x, y) 
    {
        super(x, y)
        this.energy = 100
    }

    mult() 
    {
        let emptyCells = super.chooseCell([0], this.directions5x5)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (emptyCell && this.energy > 130) 
        {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newY][newX] = 5
            let newZombie = new Zombie(newX, newY)
            zombieArray.push(newZombie)
            this.energy = 100;
        }
    }

    move() 
    {
        let cells = super.chooseCell([0, 1], this.directions5x5)
        let cell = cells[Math.floor(Math.random() * cells.length)]
        if (cell) 
        {
            let newX = cell[0]
            let newY = cell[1]
            matrix[this.y][this.x] = matrix[newY][newX]
            matrix[newY][newX] = 5

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
        let foods = super.chooseCell([4], this.directions5x5)
        let food = foods[Math.floor(Math.random() * foods.length)]
        if (food) 
        {
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            for (let i in predatorArray) 
                if (predatorArray[i].x == newX && predatorArray[i].y == newY) 
                    predatorArray.splice(i, 1)

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
            for (let i in zombieArray) 
                if (zombieArray[i].x == this.x && zombieArray[i].y == this.y) 
                    zombieArray.splice(i, 1)
        }
    }
    
}








