import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";
import { landingPage } from "../landingPage/landingPage.js";
import { STATE } from "../index.js";
import { renderAlert } from "../alert/renderAlert.js";

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

    const inputs = [enterNameInput, enterCodeInput];

    inputs.forEach((inp) => {
        inp.addEventListener("input", () => {
            if (enterNameInput.value !== "" && enterCodeInput.value !== "") {
                joinBttn.style.backgroundColor = "#FF5252"; 
            } else {
                joinBttn.style.backgroundColor = "#D25D6F"; 
            }
        });
    });
    
    
    joinForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("enterNameInput").value;
        const code = document.getElementById("enterCodeInput").value;
        
        if (code.length === 0) {
            // if (!document.getElementById("codeWarning")) {
            //     const text = document.createElement("p");
            //     text.textContent = "You have to fill in the code-field to continue";
            //     text.id = "codeWarning"; 
            //     document.getElementById("joinForm").appendChild(text);
            // }

            renderAlert('You have to fill in the code', 'error', 'wrapper');
            console.log("You have to fill in the code-field to continue");
        } else {
            const codeWarning = document.querySelector('.alert error');
            if (codeWarning) {
                codeWarning.remove();
            }
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
    });
};