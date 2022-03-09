let season = "spring"

{ 

    let autoSeasonChanging = false

    const buttons = document.querySelectorAll(".seasonButton")
    const autoButton = document.getElementById("autoButton")
    let selectedButton = buttons[0]
    selectedButton.style.border = "2px solid green"

    function addButtonEventListener()
    {
        buttons.forEach(button => button.addEventListener("click", selectSeason))
    }

    function removeButtonEventListener()
    {
        buttons.forEach(button => button.removeEventListener("click", selectSeason))
    }

    addButtonEventListener()

    autoButton.addEventListener("click", () => {
        autoSeasonChanging = !autoSeasonChanging
        if (autoSeasonChanging) removeButtonEventListener()
        else addButtonEventListener()
        if(autoSeasonChanging) autoButton.style.border = "2px solid #007EFF"
        else autoButton.style.border = "2px solid #0C0C0C"
    })

    function selectSeason(event)
    {
        if (selectedButton == event.target) return

        selectedButton.style.border = "2px solid #0C0C0C"
        selectedButton = event.target
        if(selectedButton.id != "auto") season = selectedButton.id

        if (selectedButton.id == "spring")      selectedButton.style.border = "2px solid green"
        else if (selectedButton.id == "summer") selectedButton.style.border = "2px solid yellow"
        else if (selectedButton.id == "autumn") selectedButton.style.border = "2px solid #FF8C42"
        else if (selectedButton.id == "winter") selectedButton.style.border = "2px solid white"

        socket.emit("send season", season)
    }

    setInterval(() => 
    {
        if (autoSeasonChanging){
            selectedButton.style.border = "2px solid #0C0C0C"
            if (season == "spring"){      
                season = "summer"
                selectedButton = buttons[1]
                selectedButton.style.border = "2px solid yellow"
            }
            else if (season == "summer") 
            {
                season = "autumn"
                selectedButton = buttons[2]
                selectedButton.style.border = "2px solid #FF8C42"
            }
            else if (season == "autumn") 
            {
                season = "winter"
                selectedButton = buttons[3]
                selectedButton.style.border = "2px solid white"
            }
            else if (season == "winter") 
            {
                season = "spring"
                selectedButton = buttons[0]
                selectedButton.style.border = "2px solid green"
            }

            socket.emit("send season", season)
        }
    },6000)

}
