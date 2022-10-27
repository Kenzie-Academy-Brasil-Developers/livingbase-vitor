let count = 0;

export class Observer {

    static checkFinalPost = async (permission = true) => {
        if (!permission) {
            return false;
        }
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.some((entry) => {
                if (entry.isIntersecting) {
                    console.log("estamos observando!")
                    count++
                    // StorageToRender.apiPosts(count);
                    // console.log(count)
                } else {
                    console.log("não estamos observando!")
                }
            });
        });

        intersectionObserver.observe(document.querySelector(".post-wrapper").lastElementChild);
    }
}