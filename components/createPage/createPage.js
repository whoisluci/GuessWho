import { createButton } from "../buttons/buttons.js";
import { STATE } from "../index.js";
import { renderCharacterPage } from "../characterPage/characterPage.js";
import { header } from "../header/header.js";
import { renderCards } from "../cards/cards.js";
import { renderGameBoard } from "../game/gameBoard.js";


export function renderCreatePage (parentID, pickedTheme) {

    //Displayar vald kategori, kommer ändras till en bild
    const theme = pickedTheme;
    const themeDisplay = document.createElement('div');
    themeDisplay.id = "themeDisplay";

    switch(theme) {

        case "Disney":
            themeDisplay.innerText = "Disney";
            break;

        case "Marvel":
            themeDisplay.innerText = "Marvel";
            break;

        case "Pixar":
            themeDisplay.innerText = "Pixar";
            break;

    }

    document.getElementById(parentID).innerHTML = "";
    const createForm = document.createElement("form");
    createForm.id = "createForm";
    header("wrapper");
    document.getElementById(parentID).appendChild(createForm);
    createForm.appendChild(themeDisplay);

    const titel = document.createElement("h2");
    titel.innerText = "CREATE GAME";
    titel.id = "createGameTitle";
    createForm.appendChild(titel);
    
    const enterName = document.createElement("input");
    enterName.id = "enterNameInput";
    enterName.placeholder = "ENTER NAME";
    createForm.appendChild(enterName);
    
    let createBttn = createButton("createForm", "Create", "#D25D6F", "190px");
    createBttn.id = "formCreateBttn";
    createBttn.setAttribute("type", "submit");
    createForm.appendChild(createBttn);

    enterNameInput.addEventListener("input", () => {
        if (enterNameInput.value !== "") {
            createBttn.style.backgroundColor = "#FF5252"; // Change button color
        } else {
            createBttn.style.backgroundColor = "#D25D6F"; // Reset to original color
        }
    });
        
    createForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("enterNameInput").value;

        console.log(name);

        const data = {
            event: "create",
            data: {
                "theme": STATE.selectedTheme,
                "inputName": name,
                "clientID": STATE.clientID
                }
        };
    
        /* Den här if-satsen kanske inte behövs? */
        if (STATE.selectedTheme != null) {            
            STATE.socket.send(JSON.stringify(data));
            renderCharacterPage("wrapper");
            //renderGameBoard("wrapper")
        } else {
            console.warn("You selected no theme");
            
        }
        //render pickYourAvatar
       
    });
        
}

