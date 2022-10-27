import { ToViewButton } from "./activeButtons.js";
import { Capture, GetLocalStorage } from "./localStorage.js";
import { Api } from "./request.js"

export class Render {

    static showCategories = async (bool = true) => {
        const apiRequest = await Api.getPosts();
        const ul = document.querySelector(".categories-content");

        apiRequest.slice(0, -1).forEach(elem => {
            ul.insertAdjacentHTML("beforeend",
                `<li><button data-ctgButton class="grey-btn">${elem.category}</button></li>`);

        });

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