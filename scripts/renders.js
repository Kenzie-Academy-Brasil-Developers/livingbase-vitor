import { ToViewButton } from "./activeButtons.js";
import { ScrollCategories } from "./categoriesBar.js";
import { CheckDuplicate } from "./checkDuplicate.js";
import { Capture, GetLocalStorage } from "./localStorage.js";
import { Observer } from "./observer.js";
import { Api } from "./request.js"
import { StorageToRender } from "./storage.js";


export class Render {

    static showCategories = async ( bool = true) => {
        const ul = document.querySelector(".categories-content");
        const data = await StorageToRender.apiPosts();
        console.log(data)

        data.forEach((elem) => {
            CheckDuplicate.categories(data, elem.category)

            ul.insertAdjacentHTML("beforeend",
                `<li><button data-ctgButton class="grey-btn">${elem.category}</button></li>`);
        });
        ToViewButton.categoriesButton(bool);
        ScrollCategories.checkUlLength();
    }

    static showPosts = async (data, num = 0) => {
        const ul = document.querySelector(".post-wrapper");
        console.log(data)

        if (GetLocalStorage.activeFilter() && GetLocalStorage.activeFilter() !== "Todos") {
            const filterName = GetLocalStorage.activeFilter();
            const filtered = data.filter(elem => elem.category === filterName);
            data = filtered;
            ul.innerHTML = "";
        } else if (GetLocalStorage.activeFilter() == "Todos" && num == 0) {
            ul.innerHTML = "";
        }

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
        if (GetLocalStorage.activeFilter() !== "Todos") {
            Observer.checkFinalPost(false);
        } else {
            Observer.checkFinalPost();
        }
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