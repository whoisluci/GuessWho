export function renderPopUpGuess(parent, player, guess) {

const guessData = guess;

    if (document.querySelector(".popup-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    const title = document.createElement("h2");
    title.className = "popup-title";
    title.textContent = "Incorrect Guess";
    popupContainer.appendChild(title);

    // Create the message element for the incorrect guess / Player 1 or 2 change to whatever server.js says
    const message = document.createElement("p");
    switch (player) {
        case 1:
            message.textContent = `Player 1 guessed: "${guessData.name}"`;
            break;
        case 2:
            message.textContent = `Player 2 guessed "${guessData.name}"`;
            break;
        default:
            message.textContent = "Something went wrong";
    }
    popupContainer.appendChild(message);


    const closeButton = document.createElement("button");
    closeButton.className = "popup-close-button";
    closeButton.textContent = "X";
    closeButton.onclick = () => {
        overlay.remove();
    };
    popupContainer.appendChild(closeButton);
    overlay.appendChild(popupContainer);
    parent.appendChild(overlay);
}


