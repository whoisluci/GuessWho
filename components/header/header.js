import { createButton } from "../buttons/buttons.js";
import { renderPopupHowTo } from "../popUpHowTo/popUpHowTo.js";

export function header (parentID) {
    const container = document.createElement("div");
    container.id = "headerContainer";
    document.getElementById(parentID).append(container);

    // const arrow = document.createElement('img');
    // arrow.src = './media/ep_back.png';
    // arrow.id = "arrowBack";
    // arrow.style.width = "96px"
    // arrow.style.height = "75px";
    // container.append(arrow); 

    const arrowBack = document.createElement("span");
    arrowBack.id = "arrowBack";
    arrowBack.innerHTML = `&#8592`;
    container.append(arrowBack);

    const logo = document.createElement('img');
    logo.src = '../static/media/logga.png';
    logo.id = "miniLogo";
    logo.style.width = "96px"
    logo.style.height = "75px";
    container.append(logo); 

    const helpBttn = createButton("wrapper", "?", "#FF5252", "35px");
    helpBttn.id = "helpBttnHeader";
    container.append(helpBttn);

    helpBttn.addEventListener("click", () => { 
        renderPopupHowTo("Wrapper");
    });


}