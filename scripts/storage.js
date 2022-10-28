import { Render } from "./renders.js";
import { Api } from "./request.js";

export const logStorage = [];

export class StorageToRender {

    static apiPosts = async (num = 0) => {
        await Api.getPosts(num)
        .then((res) => {
            if (logStorage.length == 18) return false;
            logStorage.push(...res);
            Render.showCategories(logStorage);
            Render.showPosts(logStorage);
        });
    }
}