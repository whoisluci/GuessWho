import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";

export function renderCreatePage (parentID, pickedTheme) {

    //Displayar vald kategori, kommer ändras till en bild
    const theme = pickedTheme;
    const themeDisplay = document.createElement('div');

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

    console.log(themeDisplay.innerText);

    document.getElementById(parentID).innerHTML = "";
    const createForm = document.createElement("form");
    createForm.id = "createForm";
    header("wrapper");
    document.getElementById(parentID).appendChild(createForm);
    createForm.appendChild(themeDisplay);

    const titel = document.createElement("h2");
    titel.innerText = "CREATE GAME";
    titel.id = "createGameId";
    createForm.appendChild(titel);
    
    const enterName = document.createElement("input");
    enterName.id = "enterNameInput";
    enterName.placeholder = "ENTER NAME";
    createForm.appendChild(enterName);
    
    const createBttn = createButton("createForm", "Create", "#D25D6F", "190px");
    createBttn.id = "formCreateBttn";
    createBttn.setAttribute("type", "submit");
    createForm.appendChild(createBttn);
        
    createForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("enterNameInput").value;
    
        console.log(name);

        //render pickYourAvatar
    });
        
};