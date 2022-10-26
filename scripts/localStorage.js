export class SetLocalStorage {
    static activeFilter = (value) => localStorage.setItem("filter", JSON.stringify(value));
}

export class GetLocalStorage {
    static activeFilter = () => JSON.parse(localStorage.getItem("filter"));
}

export class Capture {
    static postClickAndRedirect = () => {
        const allButtons = document.querySelectorAll(".show-content");

        allButtons.forEach(button => {
            button.onclick = async (e) => {
                JSON.stringify(localStorage.setItem("idPost", e.target.dataset.idpost));
                location.replace("/pages/post/");
            }
        });
    }
}