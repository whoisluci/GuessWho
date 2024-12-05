console.log(document.getElementById("wrapper"));

export function createButton(parentID, text, color, width) {
    const button = document.createElement("button");

    const textSplit = text.split(" ");

    if (textSplit.length > 1) {
        button.id = `${textSplit[0]}_button`;
    }else {
        button.id = `${text}_button`;    
    }

    button.textContent = text;
    button.className = "button";
    button.style.backgroundColor = color;
    button.style.width = width;

    document.getElementById(parentID).append(button);

    return button;
}

// function render_cards(parent, ) {
//     document.body = "";

//     for (let index = 0; index < array.length; index++) {
//         const element = array[index];
        
//     }
//     document.createElement()
// }





/*function render_cards(parent) {
    const container = document.createElement("div");
    container.id = "cards_container";
    parent.append(container);
       
}*/

/*function update_cards() {
    
}*/


