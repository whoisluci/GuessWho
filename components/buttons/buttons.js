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
    button.style.fontfamily = "chewy";
    button.style.backgroundColor = color;
    button.style.width = width;

    document.getElementById(parentID).append(button);

    return button;
}