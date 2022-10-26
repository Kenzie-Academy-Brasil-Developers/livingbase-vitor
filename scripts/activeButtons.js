export  class ToViewButton {
    static categoriesButton = () => {
        const allButtons = document.querySelectorAll("[data-ctgButton]")
        
        allButtons.forEach(button => {
            button.onclick = () => {
                allButtons.forEach(elem => elem.classList.remove("primary-btn"));
                button.classList.add("primary-btn");
            } 
        });
    }
}