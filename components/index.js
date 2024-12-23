import { landingPage } from "./landingPage/landingPage.js";
import { updateName } from "./waitingRoom/waitingRoom.js";
import { renderCharacterPage } from "./characterPage/characterPage.js";
import { startGame } from "./waitingRoom/waitingRoom.js";
import { updateBttnState } from "./game/gameBoard.js";
import { renderPopUpGuess } from "./popUpGuess/popUpGuess.js";

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
                if (message.data["Error"] != undefined || null) {
                    console.log(`[CLIENT]: Error :: ${message.data["Error"]}`);
                    break;
                }

                STATE.roomID = message.data.id;
                STATE.room = message.data;
                STATE.selectedTheme = message.data.selectedTheme;

                if (STATE.clientID === message.data.players[0].id) {
                    const name = message.data.players[1].name;
                    updateName(name);
                } else {
                    renderCharacterPage("wrapper");
                }

                console.log(`[CLIENT]: Joined room ${STATE.roomID} successfully`);
                break;
            }

            case "pickChar":
                STATE.room = message.data;
                console.log(`[CLIENT]: Character chosen successfully`);

                if (STATE.room.players.length === 2) {
                    if (STATE.room.players[1].selectedCharacter !== null || STATE.room.players[1].selectedCharacter !== undefined) {
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

                case "guess":     
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
    renderPopUpGuess(guessResult === "Correct", isGuesser);
    break;



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

    // FIXME: handle the `error` event
});
