import { STATE } from "../index.js";
import { renderCards } from "../cards/cards.js";
import { header } from "../header/header.js";
import { createButton } from "../buttons/buttons.js";
import { db } from "../index.js";

export function renderGameBoard(parentID) {
    document.getElementById(parentID).innerHTML = "";

    const _header = header("wrapper")
    const parent = document.getElementById("headerContainer");
    parent.style.marginBottom = "0px";
    parent.style.alignItems = "start";
    const child = document.getElementById("miniLogo");
    parent.removeChild(child); 
    

    const bigCard = document.createElement("div");
    bigCard.id = "yourAvatarCard";
    document.getElementById("wrapper").append(bigCard);
    // const img = document.createElement("img");
    //const choosenChar = STATE.selectedCharacter;
    // console.log("hallo", STATE)
    //img.src =;
    // const nameAvatar = document.createElement("p");
    //document.getElementById(yourAvatarCard).append(nameAvatar);

    const bttnContainer = document.createElement("div");
    bttnContainer.id = "bttnContainer";
    document.getElementById(parentID).append(bttnContainer);
    const guessBttn = createButton("wrapper", "Guess", "#7ED321", "181px");
    guessBttn.id = "guessBttn";
    const endTurnBttn = createButton("wrapper", "End turn", "#FF5252", "181px");
    endTurnBttn.id = "endTurnBttn";

    bttnContainer.append(guessBttn);
    bttnContainer.append(endTurnBttn);
    
    const board = document.createElement("div");
    board.id = "gameBoard";
    document.getElementById(parentID).append(board);

    /*fixa korten så att de kan


    /* När korten är på plats och det läggs eventListener på dem, så ska man lagra karaktären som spelaren har valt */

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

        //create chat element, own function??
        const chatElement = document.createElement("div");
        chatElement.id = "chatContainer";
        document.getElementById(parentID).append(chatElement);


        const chat = document.createElement("label");
        chat.for = "msg";
        chat.id = "chat";
        
     
        const textArea = document.createElement("textarea");
        textArea.id = "msg";
        textArea.placeholder = "Ask a question";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "btn";  
        submitButton.textContent = "Send";  

        document.getElementById("chatContainer").append(chat, textArea, submitButton);


        //EventListener on guess button
        guessBttn.addEventListener("click", () => {

            if (guessBttn.textContent === "Guess") {
                guessBttn.classList.add("clicked");
                guessBttn.textContent = "Who do you guess?"
                guessBttn.classList.remove("highlighted");
            }else {
                document.getElementById("gameBoard").removeChild(".flipcard")
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
                    
                } else{
                    selectedChar = card;
                    guessBttn.textContent = "Confirm";
                    guessBttn.classList.add("highlighted");
                    card.classList.add("selected");
                }
            } else {
                flipCardInner.classList.toggle("flipped");
            }
        });
        
    });
}


