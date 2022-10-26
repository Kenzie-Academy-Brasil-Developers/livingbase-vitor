import { GetLocalStorage, SetLocalStorage } from "./localStorage.js";
import { Render } from "./renders.js";

export class ToViewButton {
    static categoriesButton = (bool) => {
        const allButtons = document.querySelectorAll("[data-ctgButton]")
        const filteredName = GetLocalStorage.activeFilter();
        console.log(bool)
        allButtons.forEach(button => {
            if (filteredName && bool) {
                if (button.innerHTML === filteredName) {
                    allButtons.forEach(elem => elem.classList.remove("primary-btn"));
                    button.classList.add("primary-btn");
                }
            }

            button.onclick = () => {
                allButtons.forEach(elem => elem.classList.remove("primary-btn"));
                
                Render.showPosts();
                SetLocalStorage.activeFilter(button.innerHTML);
                button.classList.add("primary-btn");

                if (!bool) {
                    setTimeout(() => location.replace("/pages/home/"), 400);
                }
            }
        });
    }
}