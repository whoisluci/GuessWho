import { createButton } from "../buttons/buttons.js";
import { STATE } from "../index.js";

export function renderCreatePage (parentID) {
    document.getElementById(parentID).innerHTML = "";

    const createBttn = createButton(parentID, "Create", "#FF5252", "190px");
    createBttn.id = "createBttn";

    createBttn.addEventListener("click", () => {

        const data = {
            event: "create",
            data: {
                "theme": STATE.selectedTheme,
                "clientID": STATE.clientID
            }
        };

        /* Den här if-satsen kanske inte behövs? */
        if (STATE.selectedTheme != null) {            
            STATE.socket.send(JSON.stringify(data));
        } else {
            console.warn("You selected no theme");
        }

        /* Rendera nästa sida antingen här eller inuti if-satsen */
    });
}