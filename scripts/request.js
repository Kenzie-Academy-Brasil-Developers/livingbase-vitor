export class Api {
    
    static getPosts = async () => {
        try {
            const request = await fetch(`https://m2-api-living.herokuapp.com/news?page=20`, {
                method: "GET",
            });

            const response = await request.json();
            return response.news;

        } catch (err) {
            return err;
        }
    }

    static getPostById = async (id) => {
        try {
            const request = await fetch(`https://m2-api-living.herokuapp.com/news/${id}`, {
                method: "GET",
            });
            return request.json();
        } catch (err) {
            return err;
        }
    }
}