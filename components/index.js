import { landingPage } from "./landingPage/landingPage.js";

function renderApp() {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    landingPage("wrapper");
}

renderApp();

// <------------------------------- CLIENT ---------------------------------------->

// Client guest name, connection (i.e. socket), clientID and gameID
export const STATE = {
    "client": null,
    "socket": null,
    "clientID": null,
    "roomID": null,
    "selectedTheme": null
};

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
            //cases
            case "connect":
                STATE.clientID = message.data;
                console.log(`[CLIENT]: Client ID set successfully ${STATE.clientID}`);
                break;

            case "create":
                STATE.roomID = message.data.id;
                console.log(`[CLIENT]: Room successfully created with id ${STATE.roomID}`);
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