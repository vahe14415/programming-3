{
    const buttons = document.querySelectorAll(".framerateButton")
    const minusFive = buttons[0]
    const minusOne = buttons[1]
    const plusOne = buttons[2]
    const plusFive = buttons[3]

    const framerateText = document.getElementById("framerate")
    let framerate = 5
    framerateText.innerHTML = framerate

    buttons.forEach(button => button.addEventListener("click", changeFramerate));
    
    function changeFramerate(event)
    {
        if (event.target == minusFive) framerate -= 5
        else if (event.target == minusOne) framerate -= 1
        else if (event.target == plusOne) framerate += 1
        else if (event.target == plusFive) framerate += 5

        if(framerate > 30) framerate = 30
        else if (framerate < 1) framerate = 1
        framerateText.innerHTML = framerate

        socket.emit("change framerate", framerate)
    }
}