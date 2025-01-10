import { STATE } from "../index.js";
import { renderCards } from "../cards/cards.js";
import { header } from "../header/header.js";
import { createButton } from "../buttons/buttons.js";
import { landingPage } from "../landingPage/landingPage.js";
import { db } from "../index.js";
import { renderPopUp } from "../popUp/popUp.js";
import { renderChat } from "../chat/gameChat.js";
import { renderAlert } from "../alert/renderAlert.js";

export function renderGameBoard(parentID) {
    document.getElementById(parentID).innerHTML = "";

    header("wrapper")
    const parent = document.getElementById("headerContainer");
    parent.style.marginBottom = "0px";
    parent.style.alignItems = "start";
    const child = document.getElementById("miniLogo");
    parent.removeChild(child); 

    const arrowBack = document.querySelector("#wrapper > #headerContainer > #arrowBack");
    arrowBack.addEventListener("click", () => {
        const heading = 'Are you sure you want to exit?';
        const _exitPopUp = renderPopUp("exitPopUp", heading);
    });
    

    const bigCard = document.createElement("div");
    bigCard.id = "yourAvatarCard";
    document.getElementById("wrapper").append(bigCard);


    const choosenChar = STATE.selectedCharacter.name;
    const choosenCharImg = STATE.selectedCharacter.imagePath;
    const img = document.createElement("img");
    img.src = choosenCharImg;
    img.style.height = "100px";
  
    const nameAvatar = document.createElement("p");
    nameAvatar.textContent = choosenChar;

    // Lägg till direkt på bigCard istället för att hämta det igen
    bigCard.append(img, nameAvatar);


    const bttnContainer = document.createElement("div");
    bttnContainer.id = "bttnContainer";
    document.getElementById(parentID).append(bttnContainer);
    const guessBttn = createButton("wrapper", "Guess", "#7ED321", "181px");
    guessBttn.id = "guessBttn";
    const endTurnBttn = createButton("wrapper", "End turn", "#FF5252", "181px");
    endTurnBttn.id = "endTurnBttn";
    
    if (!STATE.isTurn) {
        endTurnBttn.disabled = true;
        guessBttn.disabled = true;

        endTurnBttn.classList.add("disabled");
        guessBttn.classList.add("disabled");

        endTurnBttn.textContent = 'Wait for turn';

        endTurnBttn.addEventListener("click", () => {
            renderAlert("It's not your turn", 'error', 'wrapper');
        });

        guessBttn.addEventListener("click", () => {
            renderAlert("It's not your turn", 'error', 'wrapper');
        });
    }

    bttnContainer.append(guessBttn);
    bttnContainer.append(endTurnBttn);
    
    const board = document.createElement("div");
    board.id = "gameBoard";
    document.getElementById(parentID).append(board);

    let cardsArray = null;

    switch (STATE.selectedTheme) {
        case "Marvel":
            cardsArray = renderCards(db[0], "gameBoard");
            break;
            
        case "Pixar": 
            cardsArray = renderCards(db[1], "gameBoard");
            break;

        case "Disney":
            cardsArray = renderCards(db[2], "gameBoard");
            break;
        }

        const _chat = renderChat(parentID);

        //EventListener on guess button. 
        guessBttn.addEventListener("click", () => {

            if (guessBttn.textContent === "Guess") {
                guessBttn.classList.add("clicked");
                guessBttn.textContent = "Who do you guess?"
                guessBttn.classList.remove("highlighted");
            } else {
                guessBttn.textContent = "Guess";
            }

        })

        
        cardsArray.forEach((card) => {
            const flipCard = document.createElement("div");
            flipCard.className = "flipCard";
        
            const flipCardInner = document.createElement("div");
            flipCardInner.className = "flipCardInner";
        
            const flipCardBack = document.createElement("div");
            flipCardBack.className = "flipCardBack";

            const logo = document.createElement('img');
            logo.src = '../static/media/logga.png';
            logo.id = "cardLogo";
            flipCardBack.appendChild(logo);

            card.classList.add("frontCard");
        
            flipCardInner.appendChild(card); 
            flipCardInner.appendChild(flipCardBack); 
            flipCard.appendChild(flipCardInner);
        
           document.getElementById("gameBoard").appendChild(flipCard);

           let selectedChar = null;

           flipCard.addEventListener("click", () => {
            cardsArray.forEach((c) => c.classList.remove("selected"));

            if (guessBttn.classList.contains("clicked")) {
                guessBttn.classList.remove("highlighted");
                guessBttn.textContent = "Who do you guess?"
                if (selectedChar === card) {
                    selectedChar = null;
                    guessBttn.style.background = "#7ED321"; 
                    guessBttn.classList.remove("highlighted");
                    
                } else {
                    selectedChar = {
                        "name": card.innerText,
                        "imagePath": card.firstChild.src
                    };

                    guessBttn.textContent = "Confirm";
                    guessBttn.classList.add("highlighted");
                    card.classList.add("selected");

                    const data = {
                        event: "guess",
                        data: {
                            clientID: STATE.clientID,
                            roomID: STATE.roomID,
                            guess: selectedChar
                        }
                    };

                    STATE.socket.send(JSON.stringify(data));
                }
            } else {
                flipCardInner.classList.toggle("flipped");
            }
        });
    });

    endTurnBttn.addEventListener("click", () => {
        const data = {
            event: "switchTurns",
            data: {
                roomID: STATE.roomID,
                clientID: STATE.clientID
            }
        };

        STATE.socket.send(JSON.stringify(data));
    });
}

export function updateBttnState () {
    if (!STATE.isTurn) {
        endTurnBttn.disabled = true;
        guessBttn.disabled = true;

        endTurnBttn.style.backgroundColor = "#F87471";
        guessBttn.style.backgroundColor = "#67B363";

        endTurnBttn.classList.add("disabled");
        guessBttn.classList.add("disabled");

        endTurnBttn.addEventListener("click", () => {
            /* Feedback */
        });

        guessBttn.addEventListener("click", () => {
            /* Feedback */
        });
    } else {
        endTurnBttn.disabled = false;
        guessBttn.disabled = false;

        endTurnBttn.style.backgroundColor = "#FF5252";
        guessBttn.style.backgroundColor = "#7ED321";

        endTurnBttn.classList.remove("disabled");
        guessBttn.classList.remove("disabled");
    }
}