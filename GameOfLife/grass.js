let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature
{
    constructor(x, y) 
    {
        super(x, y)
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
            grassArr.push(newGrass)
            matrix[newY][newX] = 1
            this.multiply = 0
        }
    }
}
