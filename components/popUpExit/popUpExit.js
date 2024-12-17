import { landingPage } from "../landingPage/landingPage.js";
export function renderpopUpExit () {
    if (document.querySelector(".popupExit-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popupExit-overlay";

    const popupContainer = document.createElement("div");
    popupContainer.className = "popupExit-container";

    const title = document.createElement("h2");
    title.className = "popup-title"; 
    title.textContent = 'Are you sure you want to exit?"';
    popupContainer.appendChild(title);

    const buttonContainer = document.CreateElement("div");
    buttonContainer.className = "button-container";

    const exitGameButtonNo = document.createElement("button");
    exitGameButtonNo.className = "popup-exitButtonNo";
    exitGameButtonNo.Style.BackgroundImage = url("./../../static/media/exitGameButtonNo");

    exitGameButtonNo.onclick = () => {
        overlay.remove();
    };

    const exitGameButtonYes = document.createElement("button");
    exitGameButtonYes.className = "popup-exitButtonYes";
    exitGameButtonYes.style.backgroundImage = "url('./../../static/media/exitGameButtonYes')";

    exitGameButtonYes.onclick = () => {
        exitGame();
    };

    /*
    exitButtonYes.onclick = () => {
    window.location.href = "landingpage.html"; 
    };
    */

    popupContainer.appendChild(exitGameButtonNo);
    popupContainer.appendChild(exitGameButtonYes);
    overlay.appendChild(popupContainer);


    document.body.appendChild(overlay);
}

function exitGame() {
    const wrapper = document.getElementById("wrapper");
    wrapper.innerHTML = ""; 

    landingPage("wrapper");
}