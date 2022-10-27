export class SetLocalStorage {
    static activeFilter = (value) => localStorage.setItem("filter", JSON.stringify(value));

    static idPost = (value) => localStorage.setItem("idPost", JSON.stringify(value));
}

export class GetLocalStorage {
    static activeFilter = () => JSON.parse(localStorage.getItem("filter"));

    static idPost = () => JSON.parse(localStorage.getItem("idPost"));
}

export class Capture {
    static postClickAndRedirect = () => {
        const allButtons = document.querySelectorAll(".show-content");

        allButtons.forEach(button => {
            button.onclick = async (e) => {
                SetLocalStorage.idPost(e.target.dataset.idpost);
                location.replace("/pages/post/");
            }
        });
    }

    static containLog = () => !GetLocalStorage.activeFilter() ? SetLocalStorage.activeFilter("Todos") : false;
}