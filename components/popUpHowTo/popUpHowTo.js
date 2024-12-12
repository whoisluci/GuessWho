export function renderPopupHowTo() {
    if (document.querySelector(".popup-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    const title = document.createElement("h2");
    title.className = "popup-title"; 
    title.textContent = 'How to play "Guess Who?"';
    popupContainer.appendChild(title);

    const message = document.createElement("p");
    message.textContent = '"Guess Who?" is a classic two-player game where each player secretly picks a character from a set of faces. Taking turns, players ask clever yes-or-no questions to narrow down the options and uncover their opponents chosen character. The first to guess correctly wins!';
    popupContainer.appendChild(message);

    const closeButton = document.createElement("button");
    closeButton.className = "popup-close-button";
    closeButton.textContent = "X";
    closeButton.onclick = () => {
        overlay.remove();
    };
    popupContainer.appendChild(closeButton);

    overlay.appendChild(popupContainer);

    document.body.appendChild(overlay);
}
