"use strict";
import { createButton } from "../buttons/buttons.js";
import { joinPage } from "../joinPage/joinPage.js";
import { selectThemePage } from "../selectThemePage/selectThemePage.js";
import { renderPopUp } from "../popUp/popUp.js";

export function landingPage (parentID) {
    // const helpBttn = createButton("wrapper", "?", "#FF5252", "35px");
    // helpBttn.id = "helpBttn";

    const helpBttn = document.createElement('img');
    helpBttn.src = '../../static/media/infoBtn.png';
    helpBttn.id = "helpBttn";
   document.getElementById(parentID).appendChild(helpBttn);

    helpBttn.addEventListener("click", () => { 
        const heading =  'How to play "Guess Who?"';
        const body = '"Guess Who?" is a classic two-player game where each player secretly picks a character from a set of faces. Taking turns, players ask clever yes-or-no questions to narrow down the options and uncover their opponents chosen character. The first to guess correctly wins!';

        renderPopUp("howToPopUp", heading, body);
    });

    const img = document.createElement('img');
    img.src = './static/media/logga.png';
    img.id = "logo";

    document.getElementById(parentID).appendChild(img);

    const container = document.createElement("div");
    container.id = "buttonContainer";
    document.getElementById(parentID).appendChild(container);

    const joinBttn = createButton("wrapper", "Join Game", "#FF5252", "190px");
    const createBttn = createButton("wrapper", "Create Game", "#FF5252", "190px");

    joinBttn.id = "joinBttn";
    createBttn.id = "createBttn";

    container.appendChild(joinBttn);
    container.appendChild(createBttn);

    joinBttn.addEventListener("click", () => {
        joinPage("wrapper");
    });

    createBttn.addEventListener("click", () => {
        selectThemePage("wrapper");
    });

    const footer = document.createElement("div");
    footer.id = "footer";
    document.getElementById(parentID).appendChild(footer);

    const footerTxt = document.createElement("p");
    footerTxt.id = "footerTxt";
    footerTxt.textContent = "© 2024 Guess Who? by  WDU23";
    footer.appendChild(footerTxt);
}