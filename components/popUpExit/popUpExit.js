import { landingPage } from "../landingPage/landingPage.js";

export function renderpopUpExit() {
    if (document.querySelector(".popupExit-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popupExit-overlay";

    const popupContainer = document.createElement("div");
    popupContainer.className = "popupExit-container";

    const title = document.createElement("h2");
    title.className = "popup-title";
    title.textContent = "Are you sure you want to exit?";
    popupContainer.appendChild(title);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const exitGameButtonNo = document.createElement("div");
    exitGameButtonNo.className = "popup-exitButtonNo";
    exitGameButtonNo.style.backgroundImage = "url('./../../static/media/exitGameButtonNo.png')"; 
    exitGameButtonNo.style.width = "50px"; 
    exitGameButtonNo.style.height = "50px";
    exitGameButtonNo.style.cursor = "pointer";
    exitGameButtonNo.onclick = () => {
        overlay.remove();
    };

    const exitGameButtonYes = document.createElement("div");
    exitGameButtonYes.className = "popup-exitButtonYes";
    exitGameButtonYes.style.backgroundImage = "url('./../../static/media/exitGameButtonYes.png')";
    exitGameButtonYes.style.width = "50px";
    exitGameButtonYes.style.height = "50px";
    exitGameButtonYes.style.cursor = "pointer";
    exitGameButtonYes.onclick = () => {
        overlay.remove(); 
        const wrapper = document.getElementById("wrapper");
        wrapper.innerHTML = "";
        landingPage("wrapper"); 
    };

    buttonContainer.appendChild(exitGameButtonNo);
    buttonContainer.appendChild(exitGameButtonYes);

    popupContainer.appendChild(buttonContainer);
    overlay.appendChild(popupContainer);

    document.body.appendChild(overlay);
}
