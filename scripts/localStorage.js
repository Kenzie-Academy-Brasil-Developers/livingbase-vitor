export class SetLocalStorage {
    static activeFilter = (value) => localStorage.setItem("filter", JSON.stringify(value));
}

export class GetLocalStorage {
    static activeFilter = () => JSON.parse(localStorage.getItem("filter"));
}