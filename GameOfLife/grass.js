let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature
{
    constructor(x, y, index) 
    {
        super(x, y)
        this.index = 1
        this.multiply = 0
    }

    mult() 
    {
        let emptyCells = super.chooseCell([0], this.directions3x3)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        this.multiply++
        if (emptyCell && this.multiply > 2) 
        {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            let newGrass = new Grass(newX, newY)
            grassArray.push(newGrass)
            matrix[newY][newX] = 1
            this.multiply = 0
        }
    }
}
