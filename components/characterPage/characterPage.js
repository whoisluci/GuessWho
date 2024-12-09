import { createButton } from "../buttons/buttons.js";
import { STATE } from "../index.js";
import { updateChar } from "../waitingRoom/waitingRoom.js";
import { renderWaitingRoom } from "../waitingRoom/waitingRoom.js";

export function renderCharacterPage (parentID) {
    document.getElementById(parentID).innerHTML = "";

    /* När korten är på plats och det läggs eventListener på dem, så ska man lagra karaktären som spelaren har valt */

    const bttn = createButton(parentID, "Confirm", "#FF5252", "190px");
    bttn.addEventListener("click", () => {

        /* Här hämtar man karaktären som spelaren har valt */
            
        const data = {
            event: "pickChar",
            data: {
                "clientID": STATE.clientID,
                /* "selectedChar": här skickar man karaktären till servern */ 
            }
        };

        STATE.socket.send(JSON.stringify(data));

        if (STATE.room.players.length === 2) {
            /* updateChar(karaktären (objekt) man har valt) */
        }

        renderWaitingRoom("wrapper");
    });
}