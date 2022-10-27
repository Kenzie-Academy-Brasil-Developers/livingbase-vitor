import { ToViewButton } from "./activeButtons.js";
import { ScrollCategories } from "./categoriesBar.js";
import { Capture, GetLocalStorage } from "./localStorage.js";
import { Observer } from "./observer.js";
import { Api } from "./request.js"

export class Render {

    static showCategories = async (bool = true) => {
        const data = ['Segurança', 'Decoração', 'Organização', 'Aromas', 'Reforma', 'Limpeza', 'Pintura'];
        const ul = document.querySelector(".categories-content");

        data.forEach((category) => {
            ul.insertAdjacentHTML("beforeend",
                `<li><button data-ctgButton class="grey-btn">${category}</button></li>`);
        });
        ScrollCategories.checkUlLength();
        ToViewButton.categoriesButton(bool);
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
        Observer.checkFinalPost();
        Capture.postClickAndRedirect();
    }

    static postPage = async () => {
        const apiRequest = await Api.getPostById(GetLocalStorage.idPost());

        const title = document.querySelector("[data-title]");
        const description = document.querySelector("[data-description]");
        const postContent = document.querySelector(".main-post");
        console.log(postContent)

        title.innerHTML = apiRequest.title;
        description.innerHTML = apiRequest.description;
        postContent.insertAdjacentHTML("beforeend", `
        <img src="${apiRequest.image}" alt="${apiRequest.title.split(" ")[0]} image">
        <p>${apiRequest.content}</p>
        `);
    }
}