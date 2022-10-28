import { ToViewButton } from "./activeButtons.js";
import { ScrollCategories } from "./categoriesBar.js";
import { CheckDuplicate } from "./checkDuplicate.js";
import { Capture, GetLocalStorage } from "./localStorage.js";
import { Observer } from "./observer.js";
import { Api } from "./request.js"

export class Render {

    static showCategories = (data, bool = true) => {
        const ul = document.querySelector(".categories-content");
        const newData = [...data];

        ul.innerHTML = "";
        ul.insertAdjacentHTML("beforeend", `<li><button data-ctgButton class="grey-btn primary-btn">Todos</button></li>`);

        newData.forEach((elem) => {
            CheckDuplicate.categories(newData, elem.category);
            ul.insertAdjacentHTML("beforeend",
                `<li><button data-ctgButton class="grey-btn">${elem.category}</button></li>`);
        });
        ToViewButton.categoriesButton(bool);
        ScrollCategories.checkUlLength();
    }

    static showPosts = (data, num = 0) => {
        const ul = document.querySelector(".post-wrapper");
        let newData = [...data];

        if (GetLocalStorage.activeFilter() && GetLocalStorage.activeFilter() !== "Todos") {
            const filterName = GetLocalStorage.activeFilter();
            const filtered = newData.filter(elem => elem.category === filterName);
            newData = filtered;
            ul.innerHTML = "";
        } else if (GetLocalStorage.activeFilter() == "Todos" && num == 0) {
            ul.innerHTML = "";
        }

        newData.forEach(elem => {
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

        title.innerHTML = apiRequest.title;
        description.innerHTML = apiRequest.description;
        postContent.insertAdjacentHTML("beforeend", `
        <img src="${apiRequest.image}" alt="${apiRequest.title.split(" ")[0]} image">
        <p>${apiRequest.content}</p>
        `);
    }
}