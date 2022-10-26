export class Api {
    
    static getPosts = () => {
        fetch(`https://m2-api-living.herokuapp.com/news?page=20`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(res => res.news)
        .catch(err => console.log(err));
    }

    static getPostById = id => {
        fetch(`https://m2-api-living.herokuapp.com/news/${id}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));
    }
}