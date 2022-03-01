let LivingCreature = require('./LivingCreature')

module.exports = class Wolf extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
    }

    mult() 
    {
        let emptyCells = super.chooseCell(0);
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (emptyCell && this.energy > 11) 
        {
            var newX = emptyCell[0]
            var newY = emptyCell[1]
            matrix[newY][newX] = 3
            var wf = new Wolf(newX, newY)
            wolfArr.push(wf)
            this.energy = 10;
        }
    }

    move() 
    {
        let cells = super.chooseCell(0, 1)
        let cell = cells[Math.floor(Math.random() * cells.length)]
        if (cell) 
        {
            let newX = cell[0]
            let newY = cell[1]
            if (matrix[newY][newX] == 0) 
            {
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0
            }
            else 
            {
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1
            }
            this.energy -= 2;
            this.x = newX
            this.y = newY
        }
    }

    eat() 
    {
        let foods = super.chooseCell(2);
        let food = foods[Math.floor(Math.random() * foods.length)]
        if (food) 
        {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in sheepArr) 
            {
                if (sheepArr[i].x === newX && sheepArr[i].y === newY) 
                {
                    sheepArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 5;
        }
    }

    die() 
    {
        if (this.energy <= 0) 
        {
            matrix[this.y][this.x] = 0
            for (var i in wolfArr) 
            {
                if (wolfArr[i].x === this.x && wolfArr[i].y === this.y) 
                {
                    wolfArr.splice(i, 1)
                }
            }
        }
    }
    
}
