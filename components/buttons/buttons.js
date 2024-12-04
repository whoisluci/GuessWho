//export {createButton} 

function renderApp() {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    landingPage("wrapper");

}

renderApp();


console.log(document.getElementById("wrapper"));

function createButton(parentID, text, color, width) {
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

}


function selectThemePage (parentID) {
    document.getElementById("Create_button").addEventListener("click", () => {
        document.getElementById(parentID).innerHTML = "";
        document.getElementById(parentID).innerHTML = `<h1>Guess Who</h1>`;
        document.getElementById(parentID).innerHTML += `<h2>Select theme</h2>`;
        const themeContainer = document.createElement("div");
        themeContainer.id = "theme_container";
        document.getElementById(parentID).append(themeContainer);
        createButton("wrapper", "Next", "#FF5252", "190px");

        const themeArray = ["Disney", "Marvel", "Pixar"] 

        for (let i = 0; i < themeArray.length; i++) {
            const themeButton = document.createElement("button");
            themeButton.id = `${themeArray[i]}_button`;
            themeButton.className = "theme_button"; 
            themeButton.textContent = themeArray[i];  
            themeContainer.append(themeButton); 
        }

    });    
}

selectThemePage("wrapper");













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


