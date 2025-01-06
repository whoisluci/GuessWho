import { STATE } from "../index.js";

export function renderPopUp (id, heading, body, isGuesser, isCorrect) {
    if (document.querySelector(id)) { return; }

    const overlay = document.createElement("div");
    overlay.classList.add("popUpOverlay");
    overlay.id = id;

    const popUpContainer = document.createElement("div");
    popUpContainer.classList.add("popUpContainer");

    const title = document.createElement("h2");
    title.id = "popUpTitle";
    title.textContent = heading;
    popUpContainer.append(title);

    if (body) {
        const msg = document.createElement("p");
        msg.textContent = body;
        popUpContainer.append(msg);
    }

    if (id !== "exitPopUp") {
        const closeButton = document.createElement("button");
        closeButton.classList.add("popUpCloseBttn");
        closeButton.textContent = "X";
        closeButton.onclick = () => {
            overlay.remove();
        };
        popUpContainer.appendChild(closeButton);
    }

    if (id === "exitPopUp") {
        const bttnDiv = document.createElement("div");
        bttnDiv.className = "bttnContainer";
    
        const noBttn = document.createElement("div");
        noBttn.className = "noBttn";
        noBttn.style.backgroundImage = "url('./../../static/media/exitGameButtonNo.png')"; 
        noBttn.onclick = () => {
            overlay.remove();
        };
    
        const yesBttn = document.createElement("div");
        yesBttn.className = "yesBttn";
        yesBttn.style.backgroundImage = "url('./../../static/media/exitGameButtonYes.png')";
        yesBttn.onclick = () => {
            overlay.remove(); 
            const wrapper = document.getElementById("wrapper");
            wrapper.innerHTML = "";
            landingPage("wrapper"); 
        };

        bttnDiv.appendChild(noBttn);
        bttnDiv.appendChild(yesBttn);
        popUpContainer.appendChild(bttnDiv);
    }

    if (id === "guessPopUp") {
        if (isGuesser) {
            // Message for the player who made the guess
            if (isCorrect) {
                title.textContent = "You Win";
                const trophy = document.createElement('img');
                trophy.id = "trophy";
                trophy.src = "../static/media/trophy.png";
                popUpContainer.appendChild(trophy);
    
                const quitButton = document.createElement("button");
                quitButton.textContent = "Quit";
                quitButton.id = "quitBttn";
                quitButton.className = 'button';
                quitButton.onclick = () => {
                    globalThis.location.href = "/index.html"; 
                };
                popUpContainer.appendChild(quitButton);
               
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
                    globalThis.location.href = "/index.html"; 
                };
                popUpContainer.appendChild(quitButton);
                
            } else {
                title.textContent = "Opponent made a guess.";
                message.textContent = "The opponent's guess was wrong.";
            }
        }
    }

    overlay.appendChild(popUpContainer);
    document.body.appendChild(overlay);
}