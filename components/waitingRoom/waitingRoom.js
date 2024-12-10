import { STATE } from "../index.js";
import { header } from "../header/header.js";
import { renderGameBoard } from "../game/gameBoard.js";

export function renderWaitingRoom(parentID) {
    document.getElementById(parentID).innerHTML = "";
    
    const _header = header("wrapper");

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

    /* Player 1 vs Player 2 */
    if (STATE.room.players.length === 1) {
        const firstPlayerName = document.createElement("h4");
        firstPlayerName.id = "firstPlayerName";
        firstPlayerName.textContent = STATE.room.players[0].name;
        document.getElementById(parentID).appendChild(firstPlayerName);
        

        /* Bilden för spelare nr1 */

        const vs = document.createElement("h4");
        vs.textContent = "vs";
        document.getElementById(parentID).appendChild(vs);

        const secondPlayerName = document.createElement("h4");
        secondPlayerName.id = "secondPlayerName";
        secondPlayerName.textContent = "Waiting...";
        document.getElementById(parentID).appendChild(secondPlayerName);

        /* Tom bild för spelare nr2 */

        /* Uppdatera namn när spelare nr 2 har joinat --> joinPage.js */
        /* Uppdatera bild när spelare nr 2 har valt karaktär --> characterPage.js */

    } else if (STATE.room.players.length === 2) {
        const firstPlayerName = document.createElement("h4");
        firstPlayerName.textContent = STATE.room.players[0].name;

        /* Bilden för spelare nr1 */

        const vs = document.createElement("h4");
        vs.textContent = "vs";


        const secondPlayerName = document.createElement("h4");
        secondPlayerName.textContent = STATE.room.players[1].name;

        /* Bilden för spelare nr2 */
        startGame();
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

export function updateChar (selectedChar) {
    console.log(selectedChar);
    /* Ska anropas när spelare nr2 har valt karaktär */
    const secondPlayerChar = document.getElementById("");
    /* selectedChar = { name, imagePath } */
    /* startGame(); */
}

function startGame () {
    setTimeout(renderGameBoard, 10000) /* <- 10 sekunder */
}