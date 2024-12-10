import { STATE } from "../index.js";

export function renderGameBoard(parentID, cards) {
    document.getElementById(parentID).innerHTML = "";

    header("wrapper")
    const parent = document.getElementById("headerContainer");
    parent.style.marginBottom = "0px"
    const child = document.getElementById("miniLogo");
    parent.removeChild(child);  
    
    const guessBttn = createButton("wrapper", "Guess", "#D25D6F", "190px");
    guessBttn.id = "guessBttn";
    const confirmBttnBttn = createButton("wrapper", "Guess", "#D25D6F", "190px");
    confirmBttnBttn.id = "confirmBttn";

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
}