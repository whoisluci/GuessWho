import { createButton } from "../buttons/buttons.js";
<<<<<<< HEAD
import { renderCreatePage } from "../createPage/createPage.js";
import { STATE } from "../index.js";
=======
import { header } from "../header/header.js"

>>>>>>> main

export function selectThemePage (parentID) {
    document.getElementById(parentID).innerHTML = "";
    const themeContainer = document.createElement("div");
    header("wrapper");

    document.getElementById(parentID).innerHTML += "<h2>Select theme</h2>";

    themeContainer.id = "theme_container";
    document.getElementById(parentID).append(themeContainer);


    const themeArray = ["Disney", "Marvel", "Pixar"] 

    const nextBttn = createButton("wrapper", "Next", "#D25D6F", "190px");
    nextBttn.id = "nextBttn";
    nextBttn.style.backgroundColor = "#FF5252C2"; 
    
    for (let i = 0; i < themeArray.length; i++) {
        const themeButton = document.createElement("button");
        themeButton.id = `${themeArray[i]}Button`;
        themeButton.className = "themeButton"; 
        themeButton.textContent = themeArray[i];  
        themeContainer.append(themeButton); 

<<<<<<< HEAD
        themeButton.addEventListener("click", () => {
            STATE.selectedTheme = themeArray[i];

            //annat som ska hända t.ex. visuella element
=======
        themeButton.addEventListener("click", () => {        
            document.querySelectorAll(".themeButton").forEach((btn) => {
            if (themeButton === btn) {
                btn.style.border = "2px solid black"; 
                nextBttn.style.backgroundColor = "#FF5252";
            }else {
                btn.style.border = "";
            }
>>>>>>> main
        });
    })      

}

    // const nextBttn = createButton("wrapper", "Next", "#D25D6F", "190px");
    // nextBttn.id = "nextBttn";

    nextBttn.addEventListener("click", () => {
<<<<<<< HEAD
        if (STATE.selectedTheme === null) {
            /* Här ska det ske någon typ av varning som säger att man måste välja tema */
        } else {
            renderCreatePage("wrapper");
        }
    });
}
=======
        //rendera nästa sida
        //renderCreatePage("wrapper");
    })
}


>>>>>>> main
