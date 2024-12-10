import { createButton } from "../buttons/buttons.js";
import { header } from "../header/header.js";


export function pickCharacterBoard (parentID, cards) {
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
    const nameAvatar = document.createElement("p");


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
                confirmBttn.style.backgroundColor = "#D25D6F";
                bigCard.removeChild(img);
                bigCard.removeChild(nameAvatar);
            }else {
                card.style.border = "2px solid black";
                confirmBttn.style.backgroundColor = "#FF5252";
                bigCard.append(img);
                document.getElementById("bigCard").append(nameAvatar);
                img.src = "./media/marvel/spiderman.png" 
                nameAvatar.textContent = "Spiderman";
            }
        });
    });

}