import { createButton } from "../buttons/buttons.js";
import { renderCreatePage } from "../createPage/createPage.js";
import { STATE } from "../index.js";

export function selectThemePage (parentID) {

    document.getElementById(parentID).innerHTML = "";
    document.getElementById(parentID).innerHTML = `<h1>Guess Who</h1>`;
    const themeContainer = document.createElement("div");
    themeContainer.id = "theme_container";
    document.getElementById(parentID).append(themeContainer);

    const themeArray = ["Disney", "Marvel", "Pixar"] 

    for (let i = 0; i < themeArray.length; i++) {
        const themeButton = document.createElement("button");
        themeButton.id = `${themeArray[i]}_button`;
        themeButton.className = "theme_button"; 
        themeButton.textContent = themeArray[i];  
        themeContainer.append(themeButton); 

        themeButton.addEventListener("click", () => {
            STATE.selectedTheme = themeArray[i];

            //annat som ska hända t.ex. visuella element
        });
    }

    const nextBttn = createButton("wrapper", "Next", "#FF5252", "190px");
    nextBttn.id = "nextBttn";

    nextBttn.addEventListener("click", () => {
        if (STATE.selectedTheme === null) {
            /* Här ska det ske någon typ av varning som säger att man måste välja tema */
        } else {
            renderCreatePage("wrapper");
        }
    });
}