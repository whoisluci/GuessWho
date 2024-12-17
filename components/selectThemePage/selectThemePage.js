import { createButton } from "../buttons/buttons.js";
import { renderCreatePage } from "../createPage/createPage.js";
import { STATE } from "../index.js";
import { header } from "./../header/header.js"
// import { renderCards } from "../cards/cards.js";
import { landingPage } from "./../landingPage/landingPage.js";

export function selectThemePage (parentID) {
    document.getElementById(parentID).innerHTML = "";
    const themeContainer = document.createElement("div");
    header("wrapper");

    document.getElementById(parentID).innerHTML += "<h2>Select theme</h2>";

    themeContainer.id = "theme_container";
    document.getElementById(parentID).append(themeContainer);

    const themeArray = ["Disney", "Marvel", "Pixar"] 

    const themeLogo = ["../static/media/Disney/logo.png", "../static/media/marvel/logo.png", "../static/media/Pixar/logo.png"] 

    const nextBttn = createButton("wrapper", "Next", "#D25D6F", "190px");
    nextBttn.id = "nextBttn";
    nextBttn.style.backgroundColor = "#FF5252C2"; 
    
    for (let i = 0; i < themeArray.length; i++) {
        const themeButton = document.createElement("button");
        themeButton.id = `${themeArray[i]}Button`;
        themeButton.className = "themeButton"; 

        const img = document.createElement("img");
        img.src = themeLogo[i];
        img.alt = `${themeArray[i]} Logo`;
        img.style.height = "40px"; // Adjust as needed
        img.style.width = "auto";  // Keep aspect ratio
        
        themeButton.append(img);
        themeContainer.append(themeButton);

        themeButton.addEventListener("click", () => {    
            STATE.selectedTheme = themeArray[i];

            console.log(themeArray[i], STATE.selectedTheme);

            document.querySelectorAll(".themeButton").forEach((btn) => {
            if (themeButton === btn) {
                console.log(themeButton, btn)
                btn.style.border = "2px solid black"; 
                nextBttn.style.backgroundColor = "#FF5252";
            } else {
                btn.style.border = "";
            }
            });
        });
    }

    nextBttn.addEventListener("click", () => {
        

        if (STATE.selectedTheme === null) {
            /* Här ska det ske någon typ av varning som säger att man måste välja tema */
        } else {
            renderCreatePage("wrapper", STATE.selectedTheme);
        }
    });
}




