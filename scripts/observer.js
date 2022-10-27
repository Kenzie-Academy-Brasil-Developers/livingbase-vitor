import { Render } from "./renders.js";

export let count = 1;

export class Observer {

    static checkFinalPost = async (permission = true) => {
        if (!permission) {
            count = 0;
            return false;
        }
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.some((entry) => {
                if (entry.isIntersecting && count <= 3) {
                    Render.showPosts(count);
                    count++;
                } 
            });
        });

        intersectionObserver.observe(document.querySelector(".post-wrapper").lastElementChild);
    }
}