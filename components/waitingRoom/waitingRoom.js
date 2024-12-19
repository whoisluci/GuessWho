import { STATE } from "../index.js";
import { header } from "../header/header.js";
import { renderGameBoard } from "../game/gameBoard.js";


export function renderWaitingRoom(parentID) {
    document.getElementById(parentID).innerHTML = "";
    
    const _header = header("wrapper");

    /*Code #1234 */
    const codeDiv = document.createElement("div");
    codeDiv.id = "codeDiv";
    document.getElementById(parentID).appendChild(codeDiv);
    codeDiv.innerHTML = `
    <p>Code:</p>
    <div id='codeContainer'>
    <p id="code">#${STATE.roomID}</p>
    </div>
    `;

    /* Ikon för att kopiera koden */
    const CTCIcon = document.createElement("img");
    const codeContainer = document.getElementById('codeContainer');
    CTCIcon.id = "copyToClipboardIcon";
    CTCIcon.src = "../static/media/copy.svg"
    codeContainer.appendChild(CTCIcon);

    /* Lägg till ikon, just nu: tom div */

    

    CTCIcon.addEventListener("click", () => {
        const code = STATE.roomID;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
            console.log("Content copied to clipboard");
        }

        codeDiv.focus();
        codeDiv.select();
        document.execCommand("copy");
    });

    const imageContainer = document.createElement('div');
    imageContainer.id = "imageContainer";
    wrapper.appendChild(imageContainer);

    /* Temat som valdes */
    switch (STATE.selectedTheme) {
        case "Marvel":
            /* Bild för Marvel */
            imageContainer.className = "theme_marvel";
            break;
            
        case "Pixar": 
            /* Bild för Pixar */
            imageContainer.className = "theme_pixar";
            break;

        case "Disney":
            /* Bild för Disney */
            imageContainer.className = "theme_disney";
            break;
        }
        
    /* Player 1 vs Player 2 Waiting for opponent + loading circle */ 
    const playersDiv = document.createElement("div");
    playersDiv.id = "playersDiv";
    document.getElementById(parentID).appendChild(playersDiv);
    
    const h2 = document.createElement('h2');
    h2.id = "waitingForOpponent";
    h2.textContent = "Waiting for opponent";
    playersDiv.appendChild(h2);

    const loadingCircle = document.createElement('div');
    loadingCircle.id = "loadingCircle";
    playersDiv.appendChild(loadingCircle);


   /* if (STATE.room.players.length === 1) {
        const firstPlayerName = document.createElement("h3");
        firstPlayerName.id = "firstPlayerName";
        firstPlayerName.textContent = STATE.room.players[0].name;
        playersDiv.appendChild(firstPlayerName);
        
        /* Bilden för spelare nr1 

        const firstPlayerDiv = document.createElement("div");
        firstPlayerDiv.id = "firstPlayerImg";
        playersDiv.appendChild(firstPlayerDiv);

        const vs = document.createElement("h3");
        vs.textContent = "vs";
        playersDiv.appendChild(vs);

        const secondPlayerName = document.createElement("h3");
        secondPlayerName.id = "secondPlayerName";
        secondPlayerName.textContent = "Waiting...";
        playersDiv.appendChild(secondPlayerName);

        /* Tom bild för spelare nr2 
        const secondPlayerDiv = document.createElement("div");
        secondPlayerDiv.id = "secondPlayerImg";
        playersDiv.appendChild(secondPlayerDiv);

    } else if (STATE.room.players.length === 2) {
        
        const firstPlayerName = document.createElement("h3");
        firstPlayerName.id = "firstPlayerName";
        firstPlayerName.textContent = STATE.room.players[1].name;
        playersDiv.appendChild(firstPlayerName);
        /* Bilden för spelare nr1 

        const vs = document.createElement("h3");
        vs.textContent = "vs";
        playersDiv.appendChild(vs);

        const secondPlayerName = document.createElement("h3");
        secondPlayerName.id = "secondPlayerName";
        secondPlayerName.textContent = STATE.room.players[0].name; ;
        playersDiv.appendChild(secondPlayerName);

        /* Bilden för spelare nr2 
        // startGame();
    }*/
}

export function updateName (updatedName) {
    const secondPlayerName = document.getElementById("secondPlayerName");
    if (secondPlayerName === null) {
        return;
    }
    secondPlayerName.textContent = null;
    secondPlayerName.textContent = updatedName;
}

export function startGame () {
    setTimeout( () => {
        renderGameBoard("wrapper");
    }, 5000); /* <- 10 sekunder */
}