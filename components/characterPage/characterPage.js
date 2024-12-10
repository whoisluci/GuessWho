import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";
import { STATE } from "../index.js";
import { updateChar } from "../waitingRoom/waitingRoom.js";
import { renderWaitingRoom } from "../waitingRoom/waitingRoom.js";
import { renderCards } from "../cards/cards.js";
import { db } from "../index.js";

export function renderCharacterPage (parentID) {
    document.getElementById(parentID).innerHTML = "";

    const _header = header("wrapper")
    const parent = document.getElementById("headerContainer");
    parent.style.marginBottom = "0px"
    const child = document.getElementById("miniLogo");
    parent.removeChild(child);   

    const bigCard = document.createElement("div");
    bigCard.id = "bigCard";
    document.getElementById(parentID).append(bigCard);
    const img = document.createElement("img");
    img.id = "bigCardImage";
    const nameAvatar = document.createElement("p");


    const title = document.createElement("h2");
    title.textContent = "Pick you character";
    document.getElementById(parentID).append(title)
    

    const board = document.createElement("div");
    board.id = "cardsBoard";
    document.getElementById(parentID).append(board);

    /* När korten är på plats och det läggs eventListener på dem, så ska man lagra karaktären som spelaren har valt */

    let cardsArray = null;

    switch (STATE.selectedTheme) {
        case "Marvel":
            cardsArray = renderCards(db[0], "cardsBoard");
            break;
            
        case "Pixar": 
            cardsArray = renderCards(db[1], "cardsBoard");
            break;

        case "Disney":
            cardsArray = renderCards(db[2], "cardsBoard");
            break;
        }

        const confirmBttn = createButton("wrapper", "Confirm", "#D25D6F", "190px");
        confirmBttn.id = "confirmBttn";

        let selectedChar = null;

        cardsArray.forEach( (card) => {
            card.addEventListener ("click", () => {

                if (card.classList.contains("selected")) {
                    confirmBttn.style.backgroundColor = "#D25D6F";
                    bigCard.removeChild(img);
                    bigCard.removeChild(nameAvatar);
                    card.classList.remove("selected");

                } else {
                    card.classList.add("selected");
                    selectedChar = card;
                    confirmBttn.style.backgroundColor = "#FF5252";
                    bigCard.append(img);
                    document.getElementById("bigCard").append(nameAvatar);
                    img.src = card.firstChild.src;
                    nameAvatar.textContent = card.lastChild.textContent;
                }
            })
        });
        
        confirmBttn.addEventListener("click", () => { 
            const data = {
                event: "pickChar",
                data: {
                    "clientID": STATE.clientID,
                    "roomID": STATE.roomID,
                    "selectedChar": { name: selectedChar.lastChild.textContent, imagePath: selectedChar.firstChild.src}
                }
            };

            STATE.socket.send(JSON.stringify(data));

            if (STATE.room.players.length === 2) {
                /* updateChar(karaktären (objekt) man har valt) */
            }

            renderWaitingRoom("wrapper");
        }); 
}