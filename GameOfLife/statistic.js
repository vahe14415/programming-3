{
    const progressBars = document.querySelectorAll(".progress-bar")
    const cellCountH1 = document.querySelectorAll(".cellCount")
    socket.on("send countOfCells", changeStatistics)

    //այստեղ փորձեցի for ցիկլով սարքել ֆունկցիան, բայց չեղավ
    function changeStatistics(data)
    {
        let percentOfGrass =    (data.grass / (matrixSize * matrixSize) * 100).toString() + "%"
        let percentOfSheep =    (data.sheep / (matrixSize * matrixSize) * 100).toString() + "%"
        let percentOfWolf =     (data.wolf / (matrixSize * matrixSize) * 100).toString() + "%"
        let percentOfPredator = (data.predator / (matrixSize * matrixSize) * 100).toString() + "%"
        let percentOfZombie =   (data.zombie / (matrixSize * matrixSize) * 100).toString() + "%"
        progressBars[0].style.width = percentOfGrass
        progressBars[1].style.width = percentOfSheep
        progressBars[2].style.width = percentOfWolf
        progressBars[3].style.width = percentOfPredator
        progressBars[4].style.width = percentOfZombie
        cellCountH1[0].innerHTML = data.grass
        cellCountH1[1].innerHTML = data.sheep
        cellCountH1[2].innerHTML = data.wolf
        cellCountH1[3].innerHTML = data.predator
        cellCountH1[4].innerHTML = data.zombie
    }
}