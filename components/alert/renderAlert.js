export function renderAlert (errText, status, parentID) {
    if (!document.querySelector(".alert")) {
        const alert = document.createElement("div");
        alert.textContent = errText;
        alert.classList.add("alert");
        alert.classList.add(status);
        document.getElementById(parentID).prepend(alert);

        alert.addEventListener("click", () => {
            alert.style.transition = "opacity 0.5s ease";
            alert.style.opacity = 0;
            setTimeout(() => { alert.style.display = "none"; }, 500);
        });
    }
}