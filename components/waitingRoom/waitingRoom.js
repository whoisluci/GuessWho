import { STATE } from "../index.js";
import { header } from "../header/header.js";
import { renderGameBoard } from "../game/gameBoard.js";
import { renderCharacterPage } from "../characterPage/characterPage.js";


export function renderWaitingRoom(parentID) {
    document.getElementById(parentID).innerHTML = "";
    
    const _header = header("wrapper");

    const arrowBack = document.querySelector("#wrapper > #headerContainer > #arrowBack");
    arrowBack.addEventListener("click", () => {
        document.getElementById(parentID).innerHTML = "";
        renderCharacterPage("wrapper");
    })

    const codeDiv = document.createElement("div");
    codeDiv.id = "codeDiv";
    document.getElementById(parentID).appendChild(codeDiv);
    codeDiv.innerHTML = `
    <p>Code:</p> <br>
    <p id="code">${STATE.roomID}</p>
    `;

    /* Ikon för att kopiera koden */
    const CTCIcon = document.createElement("div");
    CTCIcon.id = "copyToClipboardIcon";
    codeDiv.appendChild(CTCIcon);

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

    /* Temat som valdes */
    switch (STATE.selectedTheme) {
        case "Marvel":
            /* Bild för Marvel */
            break;
            
        case "Pixar": 
            /* Bild för Pixar */
            break;

        case "Disney":
            /* Bild för Disney */
            break;
        }
        
    /* Player 1 vs Player 2 */
    const playersDiv = document.createElement("div");
    document.getElementById(parentID).appendChild(playersDiv);

    if (STATE.room.players.length === 1) {
        const firstPlayerName = document.createElement("h3");
        firstPlayerName.id = "firstPlayerName";
        firstPlayerName.textContent = STATE.room.players[0].name;
        playersDiv.appendChild(firstPlayerName);
        
        /* Bilden för spelare nr1 */

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

        /* Tom bild för spelare nr2 */
        const secondPlayerDiv = document.createElement("div");
        secondPlayerDiv.id = "secondPlayerImg";
        playersDiv.appendChild(secondPlayerDiv);

    } else if (STATE.room.players.length === 2) {
        
        const firstPlayerName = document.createElement("h3");
        firstPlayerName.id = "firstPlayerName";
        firstPlayerName.textContent = STATE.room.players[1].name;
        playersDiv.appendChild(firstPlayerName);
        /* Bilden för spelare nr1 */

        const vs = document.createElement("h3");
        vs.textContent = "vs";
        playersDiv.appendChild(vs);

        const secondPlayerName = document.createElement("h3");
        secondPlayerName.id = "secondPlayerName";
        secondPlayerName.textContent = STATE.room.players[0].name; ;
        playersDiv.appendChild(secondPlayerName);

        /* Bilden för spelare nr2 */
        // startGame();
    }
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