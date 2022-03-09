{
    
    const buttons = document.querySelectorAll(".canvasSizeButton")
    buttons.forEach(button => button.addEventListener("click", selectButton))
    let selectedButton = buttons[2]
    selectedButton.style.border = "2px solid darkgoldenrod"

    function selectButton(event)
    {
        if (selectedButton == event.target) return
        selectedButton.style.border = "2px solid #0C0C0C"
        selectedButton = event.target
        selectedButton.style.border = "2px solid darkgoldenrod"
        if (selectedButton == buttons[0]) changeCanvasSize(10)
        else if (selectedButton == buttons[1]) changeCanvasSize(20)
        else if (selectedButton == buttons[2]) changeCanvasSize(30)
        else if (selectedButton == buttons[3]) changeCanvasSize(40)
        else if (selectedButton == buttons[4]) changeCanvasSize(50)
    }

}