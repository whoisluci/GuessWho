import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";
import { landingPage } from "../landingPage/landingPage.js";
import { STATE } from "../index.js";

export function joinPage(parentID) {
    document.getElementById(parentID).innerHTML = "";
    const joinForm = document.createElement("form");
    joinForm.id = "joinForm";
    header("wrapper")
    document.getElementById(parentID).appendChild(joinForm);

    const arrowBack = document.querySelector("#wrapper > #headerContainer > #arrowBack");
    arrowBack.addEventListener("click", () => {
        document.getElementById(parentID).innerHTML = "";
        landingPage("wrapper");
    })

    const titel = document.createElement("h2");
    titel.innerText = "JOIN GAME";
    titel.id = "joinGameTitle";
    joinForm.appendChild(titel);

    const enterName = document.createElement("input");
    enterName.id = "enterNameInput";
    enterName.placeholder = "ENTER NAME";
    joinForm.appendChild(enterName);

    const enterCode = document.createElement("input");
    enterCode.id = "enterCodeInput"
    enterCode.placeholder = "ENTER CODE";
    joinForm.appendChild(enterCode);

    const joinBttn = createButton("joinForm", "Join", "#D25D6F", "190px");
    joinBttn.id = "formJoinBttn";
    joinBttn.setAttribute("type", "submit");
    joinForm.appendChild(joinBttn);
    
    joinForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("enterNameInput").value;
        const code = document.getElementById("enterCodeInput").value;

        if (name.length === 0) {
            /* Pop-Up som varnar om att fylla i namn*/
            console.log("You have to fill in the name-field to continue");
        }

        if (code.length === 0) {
            /* Pop-Up som varnar om att fylla i kod*/
            console.log("You have to fill in the code-field to continue");
        }

        const data = {
            event: "join",
            data: {
                "clientID": STATE.clientID,
                "name": name,
                "roomID": code
            }
        };

        STATE.socket.send(JSON.stringify(data));

        if (STATE.roomID === null || undefined) {
            /* Pop-Up varning: No room with this ID was found */ 
            console.warn("No room with this ID was found!");   
        }
        // renderCharacterPage("wrapper");
    });
};