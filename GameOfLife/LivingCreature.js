module.exports = class LivingCreature
{
    constructor(x, y) 
    {
        this.x = x
        this.y = y
        this.multiply = 0;
        this.directions3x3 = 
        [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]

        this.directions5x5 = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1]
        ]
    }

    chooseCell(cellTypes, directions) 
    {
        let found = []
        for (let i in directions) 
        {
            let x = directions[i][0]
            let y = directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) 
                for(let j in cellTypes)
                    if (matrix[y][x] == cellTypes[j]) found.push(directions[i]);
        }
        return found
    }
    
}