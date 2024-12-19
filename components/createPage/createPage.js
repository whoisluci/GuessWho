import { createButton } from "../buttons/buttons.js";
import { STATE } from "../index.js";
import { renderCharacterPage } from "../characterPage/characterPage.js";
import { header } from "../header/header.js";
import { selectThemePage } from "../selectThemePage/selectThemePage.js";

export function renderCreatePage (parentID) {

    //Displayar vald kategori, kommer ändras till en bild
    const theme = STATE.selectedTheme;
    const themeDisplay = document.createElement('img');
    themeDisplay.id = "themeDisplay";

    switch (theme) {
        case "Disney":
            console.log(theme);
            themeDisplay.src = `../static/media/${theme}/logo.png`;
            break;
    
        case "Marvel":
            themeDisplay.src = `../static/media/${theme}/logo.png`;
            break;
    
        case "Pixar":
            themeDisplay.src = `../static/media/${theme}/logo.png`;
            break;
    
        default:
            console.error("Invalid theme:", theme);
    }
    

    document.getElementById(parentID).innerHTML = "";
    const createForm = document.createElement("form");
    createForm.id = "createForm";
    header("wrapper");

    const arrowBack = document.querySelector("#wrapper > #headerContainer > #arrowBack");
    arrowBack.addEventListener("click", () => {
        document.getElementById(parentID).innerHTML = "";
        selectThemePage("wrapper");
    })

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
    
    const createBttn = createButton("createForm", "Create", "#D25D6F", "190px");
    createBttn.id = "formCreateBttn";
    createBttn.setAttribute("type", "submit");
    createForm.appendChild(createBttn);

    enterNameInput.addEventListener("input", () => {
        if (enterNameInput.value !== "") {
            createBttn.style.backgroundColor = "#FF5252"; 
        } else {
            createBttn.style.backgroundColor = "#D25D6F"; 
        }
    });
        
    createForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("enterNameInput").value;

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
        } else {
            console.warn("You selected no theme");
            
        }
    });
}