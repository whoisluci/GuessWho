export function renderPopUpGuess(player, guess, isCorrect) {

    const guessData = guess;
    console.log("this is guessData: ", guessData);
    const wrapper = document.getElementById('wrapper');

    // Prevent multiple popups from being created
    if (document.querySelector(".popup-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    const title = document.createElement("h2");
    title.className = "popup-title";
    popupContainer.appendChild(title);

    const message = document.createElement("p");

    //Correct guess
    if (isCorrect) {
        
        title.textContent = "Correct Guess!";
        message.textContent = `Player ${player} guessed correctly! The character is "${guessData.name}".`;
        console.log(`Player ${player} wins!`);
    } else {
        
    // Incorrect guess
        title.textContent = "Incorrect Guess";
        message.textContent = `Player ${player} guessed: "${guessData.name}". Try again!`;
        console.log(`Player ${player} incorrect guess.`);
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
