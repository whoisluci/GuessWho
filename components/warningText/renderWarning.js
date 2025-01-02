export function showWarning (errText, parentID) {
    if (!document.getElementById("warning")) {
        const text = document.createElement("p");
        text.textContent = errText;
        text.id = "feedbackWarning"; 
        document.getElementById(parentID).appendChild(text);
    }
}