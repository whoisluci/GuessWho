import { createButton } from "../buttons/buttons.js";

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
            //vill vi lagra temat här?
            let theme = themeArray[i];
        });
    }

    const nextBttn = createButton("wrapper", "Next", "#FF5252", "190px");
    nextBttn.id = "nextBttn";

    nextBttn.addEventListener("click", () => {
        //rendera nästa sida
        //renderCreatePage("wrapper");
    })
}