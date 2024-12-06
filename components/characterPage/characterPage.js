import { createButton } from "../buttons/buttons.js";
import { STATE } from "../index.js";

export function renderCharacterPage (parentID) {
    document.getElementById(parentID).innerHTML = "";
    
    /* If-sats som kollar vem som är inloggad spelaren */
    // for (let player of STATE.room.players) {
    //     if (player[id] === STATE.clientID) {

    //     }
    // }

    const bttn = createButton(parentID, "Play", "#FF5252", "190px");
    bttn.addEventListener("click", () => {

        /* Här hämtar man karaktären som spelaren har valt */
            
        const data = {
            event: "selectChar",
            data: {
                "clientID": STATE.clientID,
                /* "selectedChar": här skickar man karaktären till servern */ 
            }
        };
        // STATE.socket.send(JSON.stringify(data));
    });
}