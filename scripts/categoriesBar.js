export class ScrollCategories {

    static checkUlLength() {

        const nav = document.querySelector(".categories");
        const ul = document.querySelector(".categories-content");
        if (ul.children.length >= 8 && !document.querySelector(".pass-btn")) {
            nav.insertAdjacentHTML("beforeend", `<button class="pass-btn right-pass"></button>`);
            this.scrollToRight();
        }
    }

    static scrollToRight() {
        const nav = document.querySelector(".categories");
        const ul = document.querySelector(".categories-content");
        const button = document.querySelector(".right-pass");

        button.onclick = () => {
            ul.scrollBy(150, 0);

            if (!document.querySelector(".left-pass")) {
                nav.insertAdjacentHTML("beforeend", `<button class="pass-btn left-pass"></button>`);
                this.scrollToLeft();
            }
        }
    }

    static scrollToLeft() {
        const ul = document.querySelector(".categories-content");
        const button = document.querySelector(".left-pass");

        button.onclick = () => {
            ul.scrollBy(-1200, 0);
            document.querySelector(".left-pass").remove();
        }
    }
}