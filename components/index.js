import { landingPage } from "./landingPage/landingPage.js";
import { updateWaitingText } from "./waitingRoom/waitingRoom.js";
import { renderCharacterPage } from "./characterPage/characterPage.js";
import { startGame } from "./waitingRoom/waitingRoom.js";
import { updateBttnState } from "./game/gameBoard.js";
import { renderPopUp } from "./popUp/popUp.js";
import { renderAlert } from "./alert/renderAlert.js";
import { handleChatMessage } from "./chat/gameChat.js";
import { renderChatAlert } from "./chat/gameChat.js";

function renderApp() {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    landingPage("wrapper");
}

renderApp();

// <------------------------------- CLIENT ---------------------------------------->
export const STATE = {
    "client": null,
    "socket": null,
    "clientID": null,
    "roomID": null,
    "room": null,
    "selectedTheme": null,
    "selectedCharacter": null,
    "isTurn": null
};

export let db = null;

// Client Event Handlers
// ==============================================================
globalThis.addEventListener("load", () => {
    STATE.socket = new WebSocket("ws://localhost:8888");

    STATE.socket.addEventListener("open", (event) => {
        STATE.client = event;
        let _pingInterval = null;
        if (!_pingInterval) {
            _pingInterval = setInterval(() => {
                console.log("Sending ping to server...");
                STATE.socket.send(JSON.stringify({event: "ping", data: {}}));  
            }, 60000);
        }
        console.info("[CLIENT]: Connection established!");
    });

    STATE.socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);

        switch (message.event) {
            case "connect":
                STATE.clientID = message.data.clientID;
                db = message.data.db;

                console.log(`[CLIENT]: Client ID set successfully ${STATE.clientID}`);
                break;

            case "create":
                STATE.roomID = message.data.id;
                STATE.room = message.data;

                console.log(`[CLIENT]: Room successfully created with id ${STATE.roomID}`);
                break;

            case "join": {
                console.log(message);
                
                if (message.data.Error) {
                    console.log(`[CLIENT]: Error :: ${message.data}`);
                    console.log(message.data.Error);
                    
                    renderAlert(message.data["Error"], "error" ,"wrapper");
                    break;
                }

                if (!message.data || typeof message.data !== "object" || Object.keys(message.data).length === 0) { 
                    console.error(`[CLIENT]: Received empty or invalid data`); 
                    renderAlert('Invalid data received', 'error', 'wrapper'); 
                    break; 
                }

                STATE.roomID = message.data.id;
                STATE.room = message.data;
                STATE.selectedTheme = message.data.selectedTheme;

                if (message.data.players) {
                    if (STATE.clientID === message.data.players[0].id) {
                        const name = message.data.players[1].name;
                        updateWaitingText(`Waiting for ${name}. . .`);
                        
                    } else {
                        renderCharacterPage("wrapper");
                        renderAlert('Joined successfully!', 'success', 'wrapper');
                    }
                    console.log(`[CLIENT]: Joined room ${STATE.roomID} successfully`);
                }

                break;
            }

            case "pickChar":
                STATE.room = message.data;
                console.log(`[CLIENT]: Character chosen successfully`);

                if (STATE.room.players.length === 2) {
                    if (STATE.room.players[1].selectedCharacter !== null || STATE.room.players[1].selectedCharacter !== undefined) {
                        updateWaitingText(`Now loading game. . .`);
                        startGame();
                    }
                }
                break;

            case "start": 
                STATE.room = message.data;
                for (const player of STATE.room.players) {
                    if (STATE.clientID === player.id) {
                        STATE.isTurn = player.isTurn;
                    }
                }
                console.log(`[CLIENT]: Player with ${STATE.clientID} is ready to play`);
                break;

            case "switchTurns":
                STATE.room = message.data;

                for (const player of STATE.room.players) {
                    if (player.id === STATE.clientID) {
                        STATE.isTurn = player.isTurn;
                        updateBttnState();
                    }
                }

                console.log(`[CLIENT]: Turns have switched`);
                break;

            case "guess": {     
                console.log(`[CLIENT]: A guess was made`);
                console.log("Received message:", message);

                // Extract the result of the guess and the guesser's ID
                const guessResult = message.data.Guess; // "Correct" or "Wrong"
                const guesserID = message.data.guesserID; // The player who made the guess

                // Log for debugging
                console.log(`[CLIENT]: Guesser ID: ${guesserID}, Result: ${guessResult}`);

                // Determine if the current player is the guesser
                const isGuesser = STATE.clientID === guesserID;

                // Render the appropriate pop-up
                renderPopUp("guessPopUp", null, null, guessResult === "Correct", isGuesser);
                break;
            }

            case "chatMsg": {
                console.log(`[CLIENT]: A message was sent!`);

                const msg = message.data;
                handleChatMessage(msg);

                break;
            }

            case "incomingMsg": {
                console.log(`[CLIENT]: There is an incoming message`);
                
                STATE.room = message.data;
                if(!document.querySelector("#chatOverlay")) {
                    renderChatAlert();
                }

                break;
            }

            case  "updateChatHistory": {
                console.log(`[CLIENT]: The chat history was updated`);
                STATE.room = message.data;
                break;
            }

            case "pong": {
                console.log('Pong recieved', message.data);
                break;
            }
            
            default:
                console.error(`[CLIENT]: Error :: Unknown event ${message.event}`);
                break;
        }
        
        console.log(`[CLIENT]: Message :: ${message.event} :: `, message);
    });

    STATE.socket.addEventListener("close", (event) => {
        console.info("[CLIENT]: Disconnected.", event);
    });

    STATE.socket.addEventListener("error", (error) => {
        console.log(`[CLIENT]: ERROR`, error);
    });
});
