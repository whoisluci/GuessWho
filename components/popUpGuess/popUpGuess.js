

export function renderPopUpGuess(isCorrect, isGuesser) {
    const wrapper = document.getElementById('wrapper');

    // Prevent multiple popups from being created
    if (document.querySelector(".popup-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";
    popupContainer.id = "popupContainer";

    const title = document.createElement("h2");
    title.className = "popup-title";
    title.id = "guessed-title";
    popupContainer.appendChild(title);


    const message = document.createElement("p");

    if (isGuesser) {
        // Message for the player who made the guess
        if (isCorrect) {
            title.textContent = "You Win";
            const trophy = document.createElement('img');
            trophy.id = "trophy";
            trophy.src = "../static/media/trophy.png";
            popupContainer.appendChild(trophy);

            const quitButton = document.createElement("button");
            quitButton.textContent = "Quit";
            quitButton.id = "quitButton";
            quitButton.className = 'button';
            quitButton.onclick = () => {
                window.location.href = "/index.html"; 
            };
            popupContainer.appendChild(quitButton);
           
        } else {
            title.textContent = "Your Guess Was Incorrect";
            message.textContent = "Try again!";
        }
    } else {
        // Message for the opponent
        if (isCorrect) {
            title.textContent = "You lose";
            
            const quitButton = document.createElement("button");
            quitButton.textContent = "Quit";
            quitButton.id = "quitButton";
            quitButton.className = 'button';
            quitButton.onclick = () => {
                window.location.href = "/index.html"; 
            };
            popupContainer.appendChild(quitButton);
            
        } else {
            title.textContent = "Opponent made a guess.";
            message.textContent = "The opponent's guess was wrong.";
        }
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
    wrapper.appendChild(overlay);
}
