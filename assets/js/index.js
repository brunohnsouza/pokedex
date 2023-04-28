import { app } from "../js/app.js";
import elements from "./elements.js";

window.addEventListener("load", () => {

    app.start()

    setInterval(() => {
        elements.loading.style.display = "none"
    }, 2000)

})