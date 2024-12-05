import { landingPage } from "./landingPage/landingPage.js";

function renderApp() {
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    landingPage("wrapper");
}

renderApp();