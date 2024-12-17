import { createButton } from "../buttons/buttons.js";
import { renderPopupHowTo } from "../popUpHowTo/popUpHowTo.js";

export function header (parentID) {
    const container = document.createElement("div");
    container.id = "headerContainer";
    document.getElementById(parentID).append(container);

    const arrow = document.createElement('img');
    arrow.src = '../../static/media/backArrow.png';
    arrow.id = "arrowBack";
    arrow.style.width = "45px"
    arrow.style.height = "40px";
    container.append(arrow); 

    // const arrowBack = document.createElement("span");
    // arrowBack.id = "arrowBack";
    // //arrowBack.innerHTML = `&#8592`;
    // arrowBack.innerHTML = "←";
    // container.append(arrowBack);

    const logo = document.createElement('img');
    logo.src = '../static/media/logga.png';
    logo.id = "miniLogo";
    logo.style.width = "96px"
    logo.style.height = "75px";
    container.append(logo); 

    // const helpBttn = createButton("wrapper", "?", "#FF5252", "35px");
    // helpBttn.id = "helpBttnHeader";
    // container.append(helpBttn);

    const helpBttn = document.createElement('img');
    helpBttn.src = '../static/media/infoBtn.png';
    helpBttn.id = "helpBttnHeader";
    helpBttn.style.width = "45px"; // Bredd på knappen
    helpBttn.style.height = "45px";
    container.append(helpBttn); // Lägger till elementet i containern

    helpBttn.addEventListener("click", () => { 
        renderPopupHowTo("Wrapper");
    });
}