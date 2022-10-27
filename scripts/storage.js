import { Api } from "./request.js";

const postsStorage = [];

export class StorageToRender {

    static apiPosts = async (num = 0) => {
        const apiData = await Api.getPosts(num);
        postsStorage.push(...apiData);
        console.log(postsStorage)
        return postsStorage;
    }
}