import { Api } from './api.js';

export { RoutineApi, Search };

class RoutineApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static async getRoutines(controller) {
        return await Api.get(`${RoutineApi.url}?page=0&size=20&orderBy=date&direction=asc`, true, controller);
    }

    static async getUserRoutines(controller) {
        return await Api.get(`${RoutineApi.url}?page=0&size=9&orderBy=date&direction=asc`, true, controller);
    }

}

class Search {
    constructor(search, page,items) {
        this.search = search;
        this.page = page;
        this.items = items;
    }
}