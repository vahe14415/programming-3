let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
    /*constructor(x, y) {
        super(x, y)
        this.multiply = 0;
    }*/

    mult() {
        let emptyCells = super.chooseCell(0);
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.multiply++;
        if (emptyCell && this.multiply > 1) {
            var newX = emptyCell[0];
            var newY = emptyCell[1];
            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            matrix[newY][newX] = 1;
            this.multiply = 0;
        }
    }
}
