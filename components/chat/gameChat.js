"use strict";
import { STATE } from "../index.js";

export function renderChat(parentID) {
    const div = document.createElement("div");
    div.id = "chatIconDiv";
    document.getElementById(parentID).append(div);

    const chatBttn = document.createElement("img");
    chatBttn.src = '../../static/media/text-message-icon.svg';
    chatBttn.id = "chatBttn";
    div.append(chatBttn);

    chatBttn.addEventListener("click", () => {
        const chatDiv = document.createElement("div");
        chatDiv.id = 'chatOverlay';
        document.getElementById(parentID).append(chatDiv);

        const chat = document.createElement("label");
        chat.for = "msg";
        chat.id = "chat";

        const exit = document.createElement("p");
        chatDiv.append(exit);
        exit.textContent = "X";
        exit.onclick = () => {
            chatDiv.remove();
        };
        exit.id = "exitBttn";

        const chatHistory = document.createElement("div");
        chatHistory.id = "chatHistory";
        chatDiv.append(chatHistory);
        const title = document.createElement("h1");
        title.textContent = "Chat history";
        chatHistory.append(title);

        const textArea = document.createElement("textarea");
        textArea.id = "msgInput";
        textArea.placeholder = "Ask a question";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.id = "sendBttn";
        submitButton.textContent = "Send";

        chatDiv.append(chat, textArea, submitButton);

        const dot = document.querySelector("#notificationDot");
        if (dot) {
            dot.remove();
        }

        if (STATE.room.chatHistory.length > 0) {
            handleChatHistory(STATE.room.chatHistory);
        }

        submitButton.addEventListener("click", () => {

            if (textArea != "") {
                console.log('Chat sent')
                const msg = textArea.value;

                const data = {
                    event: "chatMsg",
                    data: {
                        clientID: STATE.clientID,
                        roomID: STATE.roomID,
                        message: msg,
                    }
                };

                STATE.socket.send(JSON.stringify(data));
            }
            else {
                console.log('Write a question')
            }
        });
    });


}

export function handleChatMessage(data) {
    const chatHistory = document.getElementById("chatHistory");
    const div = document.createElement("div");
    div.classList.add("chatBubble");

    // if (data.name == me) {
    //     div.className = "you";
    // }

    console.log(data)
    div.innerHTML = `
        <span class="guestName">${data.name}</span>
        <span class="msg">${data.text}</span>
    `;

    chatHistory.append(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function handleChatHistory(data) {
    for (const message of data) {
        handleChatMessage(message);
    }
}

export function renderChatAlert() {
    const dot = document.createElement("div");
    dot.id = "notificationDot";
    const icon = document.querySelector("#chatIconDiv");

    icon.appendChild(dot);
}