import { ToViewButton } from "./activeButtons.js";
import { Capture, GetLocalStorage } from "./localStorage.js";
import { Api } from "./request.js"

export class Render {

    static showCategories = async () => {
        const apiRequest = await Api.getPosts();
        const ul = document.querySelector(".categories-content");

        apiRequest.slice(0, -1).forEach(elem => {
            ul.insertAdjacentHTML("beforeend",
                `<li><button data-ctgButton class="grey-btn">${elem.category}</button></li>`);

        });

        ToViewButton.categoriesButton();
    }

    static showPosts = async () => {
        const ul = document.querySelector(".post-wrapper");
        let data = await Api.getPosts();

        if (GetLocalStorage.activeFilter() && GetLocalStorage.activeFilter() !== "Todos") {
            const filterName = GetLocalStorage.activeFilter();
            const filtered = data.filter(elem => elem.category === filterName);
            data = filtered;
        }
        
        ul.innerHTML = "";
        data.forEach(elem => {
            ul.insertAdjacentHTML("beforeend", `
            <li class="post">
                <img src="${elem.image}" alt="${elem.title.split(" ")[0]} image">
                <h3>${elem.title}</h3>
                <p>${elem.description}</p>
                <span data-idpost="${elem.id}" class="show-content">Acessar conteúdo</span>
            </li>
            `);
        });
        Capture.postClickAndRedirect();
    }
}