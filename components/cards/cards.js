import { pickCharacterBoard } from "../pickCharacterPage/pickCharacterPage.js"
import { renderGameBoard } from "../game/gameBoard.js";


export function renderCards(data) {
    const cardArray = [];
    
    for (let i = 0; i < data; i++) {
        const card = document.createElement("div"); 
        const img = document.createElement("img");
        const name = document.createElement("p");
        card.append(img);
        card.append(name);
        //document.getElementById(parentID).append(card);
        //card.className = "card";
        card.className = "card";  
        img.src = "./media/marvel/spiderman.png" 
        name.textContent = "Spiderman"; 
        cardArray.push(card);
    }
    
    pickCharacterBoard("wrapper", cardArray)
    renderGameBoard("wrapper")


}




    
        
