import { createButton } from "../buttons/buttons.js";
import { STATE } from "../index.js";
import { renderCharacterPage } from "../characterPage/characterPage.js";

export function renderCreatePage (parentID) {
    document.getElementById(parentID).innerHTML = "";

    const nameInput = document.createElement("input");
    document.getElementById(parentID).appendChild(nameInput);
    nameInput.placeholder = "ENTER NAME";
    nameInput.id = "nameInputField";

    console.log(nameInput.value);

    const createBttn = createButton(parentID, "Create", "#FF5252", "190px");
    createBttn.id = "createBttn";

    createBttn.addEventListener("click", () => {

        const data = {
            event: "create",
            data: {
                "theme": STATE.selectedTheme,
                "inputName": nameInput.value,
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