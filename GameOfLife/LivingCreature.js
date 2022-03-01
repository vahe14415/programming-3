module.exports = class LivingCreature
{
    constructor(x, y) 
    {
        this.x = x;
        this.y = y;
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

    chooseCell(character, directions) 
    {
        let found = []
        for (let i in directions) 
        {
            let x = directions[i][0]
            let y = directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) 
                if (matrix[y][x] == character) found.push(directions[i]);
        }
        return found;
    }

    /*chooseCell(character1, character2, directions) 
    {
        let found = []
        for (let i in directions) 
        {
            let x = directions[i][0]
            let y = directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) 
            {
                if (matrix[y][x] == character1) 
                {
                    found.push(directions[i])
                }
                else if (matrix[y][x] == character2) 
                {
                    found.push(directions[i])
                }
            }
        }
        return found;
    }*/
    
}