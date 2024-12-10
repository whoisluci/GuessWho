"use strict";
export function renderCards(data, parentID) {

    const cardsArray = [];
    
    for (const char of data.characters) {
        const card = document.createElement("div"); 
        const img = document.createElement("img");
        const name = document.createElement("p");

        card.append(img);
        card.append(name);

        document.getElementById(parentID).append(card);
        card.className = "card";  

        img.src = `../${char.imagePath}`;
        name.textContent = char.name;

        cardsArray.push(card);
    }

    return cardsArray;
}