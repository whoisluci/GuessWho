import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";

// // Fetch the JSON file
// fetch("data.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Parse the JSON response
//   })
//   .then((data) => {
//     // Use the JSON data
//     console.log("Themes:", data.themes);
//     console.log("Info:", data.info);

//     // Example: Display the themes
//     const themeContainer = document.getElementById("themeContainer");
//     data.themes.forEach((theme) => {
//       const themeButton = document.createElement("button");
//       themeButton.textContent = theme;
//       themeContainer.append(themeButton);
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });



function renderboard (parentID, cards) {
    document.getElementById(parentID).innerHTML = "";

    header("wrapper")
    const parent = document.getElementById("headerContainer");
    parent.style.marginBottom = "0px"
    const child = document.getElementById("miniLogo");
    parent.removeChild(child);
    
    

    const bigCard = document.createElement("div");
    bigCard.id = "bigCard";
    document.getElementById(parentID).append(bigCard);
    const img = document.createElement("img");
    img.id = "bigCardImage";
    


    const title = document.createElement("h2");
    title.textContent = "Pick you character";
    document.getElementById(parentID).append(title)
    

    const board = document.createElement("div");
    board.id = "cardBoard";
    document.getElementById(parentID).append(board);


    let card = "";

    for (let i = 0; i < cards.length; i++) {
        card = cards[i];
        board.append(card);  
    }

    const confirmBttn = createButton("wrapper", "Confirm", "#D25D6F", "190px");
    confirmBttn.id = "confirmBttn";

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            if (card.style.border === "2px solid black") {
                card.style.border = ""; 
                confirmBttn.style.backgroundColor = "#FF5252";
                bigCard.removeChild(img);
            }else {
                bigCard.append(img);
                card.style.border = "2px solid black";
                img.src = "./media/marvel/spiderman.png" 
            }
        });
    });

}



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
    
    renderboard("wrapper", cardArray)
    // return cardArray

}




    
    
    
    
    
/*function render_cards(parent) {
    const container = document.createElement("div");
    container.id = "cards_container";
    parent.append(container);
       
}

/*function update_cards() {
    
}*/