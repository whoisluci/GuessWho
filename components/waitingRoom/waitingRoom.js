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
    <p>Code:</p>
    <div id='codeContainer'>
    <textarea readonly id="code">${STATE.roomID}</textarea>
    </div>
    `;

    /* Ikon för att kopiera koden */
    const CTCIcon = document.createElement("img");
    const codeContainer = document.getElementById('codeContainer');
    CTCIcon.id = "copyToClipboardIcon";
    CTCIcon.src = "../static/media/copy.svg"
    codeContainer.appendChild(CTCIcon);
    
    codeContainer.addEventListener("click", async () => {
        const code = STATE.roomID;
        console.log(code);
        
        if (navigator.clipboard){
            try {
                await navigator.clipboard.writeText(code);
                console.log("Content copied to clipboard");
                return;
            } catch (err) {
                console.error("Unable to copy to clipboard", err);
            }
        }

        try {
            document.getElementById("code").select();
            document.execCommand("copy");
            console.log("Content copied to clipboard");
        } catch (err) {
            console.error("Unable to copy to clipboard", err);
        }
        

        
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
    playersDiv.appendChild(h2);
    
    if (STATE.room.players.length === 2){

        h2.textContent = `Waiting for ${STATE.room.players[0].name} . . .`;
    } else {
        h2.textContent = "Waiting for opponent . . .";
    }

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
    const text = document.getElementById("waitingForOpponent");
    console.log(text);
    
    if (text === null) {
        return;
    }

    text.textContent = null;
    text.textContent = `Waiting for ${updatedName}. . .`;

    console.log(text);
    
}

export function startGame () {
    /* Skickas två gånger, en per klient */

    const data = {
        event: "start",
        data: {
            clientID: STATE.clientID,
            roomID: STATE.roomID
        }
    };

    STATE.socket.send(JSON.stringify(data));

    setTimeout( () => {
        renderGameBoard("wrapper");
    }, 5000); /* <- 5 sekunder */
}