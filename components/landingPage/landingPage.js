
function landingPage (parentID) {
    document.getElementById(parentID).innerHTML = `<h1>Guessss Who</h1>`;
    const img = document.createElement('img');
    img.src = './logga1.jpg';

    document.getElementById(parentID).appendChild(img);

    createButton("wrapper", "Join Game", "#FF5252", "190px");
    createButton("wrapper", "Create Game", "#FF5252", "190px");

}   