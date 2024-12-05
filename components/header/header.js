import { createButton } from "../buttons/buttons.js";

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

    const img = document.createElement('img');
    img.src = './media/logga.png';
    img.id = "miniLogo";
    img.style.width = "96px"
    img.style.height = "75px";
    container.append(img); 

    const helpBttn = createButton("wrapper", "?", "#FF5252", "35px");
    helpBttn.id = "helpBttnHeader";
    container.append(helpBttn);


}