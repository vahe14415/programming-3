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
        
        if (season == "spring") this.multiply += 100
        else if (season == "summer") this.multiply += 50
        else if (season == "autumn") this.multiply += 20
        else if (season == "winter") this.multiply += 10

        if (emptyCell && this.multiply >= 100) 
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
