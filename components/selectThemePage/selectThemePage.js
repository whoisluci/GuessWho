import { createButton } from "../buttons/buttons.js";
import { renderCreatePage } from "../createPage/createPage.js";
import { STATE } from "../index.js";
import { header } from "../header/header.js"
import { landingPage } from "../landingPage/landingPage.js";


export function selectThemePage (parentID) {
    document.getElementById(parentID).innerHTML = "";
    const themeContainer = document.createElement("div");
    header("wrapper");
    themeContainer.id = "theme_container";
    document.getElementById(parentID).append(themeContainer);

    const arrowBack = document.querySelector("#wrapper > #headerContainer > #arrowBack");
    arrowBack.addEventListener("click", () => {
        document.getElementById(parentID).innerHTML = "";
        landingPage("wrapper");
    })
    
    const selectedThemeTitle = document.createElement('h2');
    selectedThemeTitle.id = "selectThemeTitle";
    selectedThemeTitle.innerText = "Select theme";
    themeContainer.appendChild(selectedThemeTitle);
   
    const themeArray = ["Disney", "Marvel", "Pixar"] 

    const themeLogo = ["../static/media/Disney/logo.png", "../static/media/marvel/logo.png", "../static/media/Pixar/logo.png"] 

    
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
                    btn.classList.add("themeSelected");
                    nextBttn.style.backgroundColor = "#FF5252";
                } else {
                    btn.classList.remove("themeSelected");
                }
            });
        });


    }
    
    const nextBttn = createButton("wrapper", "Next", "#D25D6F", "190px");
    nextBttn.id = "nextBttn";
    nextBttn.style.backgroundColor = "#FF5252C2"; 

    nextBttn.addEventListener("click", () => {
        

        if (STATE.selectedTheme === null) {
            /* Här ska det ske någon typ av varning som säger att man måste välja tema */
        } else {
            renderCreatePage("wrapper", STATE.selectedTheme);
        }
    });
}




