import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";
import { STATE } from "../index.js";
import { renderWaitingRoom } from "../waitingRoom/waitingRoom.js";
import { renderCards } from "../cards/cards.js";
import { db } from "../index.js";

export function renderCharacterPage (parentID) {
    document.getElementById(parentID).innerHTML = "";

    const _header = header("wrapper")
    const parent = document.getElementById("headerContainer");
    parent.style.marginBottom = "0px";
    parent.style.alignItems = "start";
    const child = document.getElementById("miniLogo");
    parent.removeChild(child);   

    const bigCard = document.createElement("div");
    bigCard.id = "bigCard";
    document.getElementById("headerContainer").append(bigCard);
    const img = document.createElement("img");
    img.id = "bigCardImage";
    const nameAvatar = document.createElement("p");


    const title = document.createElement("h2");
    title.textContent = "Pick your character";
    document.getElementById(parentID).append(title)
    

    const board = document.createElement("div");
    board.id = "cardsBoard";
    document.getElementById(parentID).append(board);

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

    cardsArray.forEach((card) => {
        card.addEventListener("click", () => {
            cardsArray.forEach((c) => c.classList.remove("selected"));
            
            bigCard.innerHTML = "";
    
            if (card === selectedChar) {
                selectedChar = null; 
                confirmBttn.style.backgroundColor = "#D25D6F"; 
            } else {
                card.classList.add("selected");
                selectedChar = card;
                confirmBttn.style.backgroundColor = "#FF5252";
                img.src = card.firstChild.src;
                nameAvatar.textContent = card.lastChild.textContent;
                bigCard.append(img, nameAvatar);
            }
        });
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
        renderWaitingRoom("wrapper");
    }); 
}