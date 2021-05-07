import { Api } from './api.js';

export { RoutineApi, Search, RoutineBase, Cycle };

class RoutineApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static async getRoutines(controller) {
        return await Api.get(`${RoutineApi.url}?page=0&size=9&orderBy=date&direction=asc`, false, controller);
    }

    static async getUserRoutines(controller) {
        return await Api.get(`${Api.baseUrl}/users/current/routines/?page=0&size=9&orderBy=date&direction=asc`, true, controller);
    }

    static async createRoutine(routineBase,controller) {
        return await Api.post(`${RoutineApi.url}`, true, routineBase, controller);
    }

    static async addCycle(routineId,cycle,controller) {
        await Api.post(`${RoutineApi.url}/${routineId}/cycles`, true, cycle, controller);
    }

    static async getCycles(routineId,controller) {
        return await Api.get(`${RoutineApi.url}/${routineId}/cycles`, true, controller);
    }

    static async deleteRoutine(routineId,controller){
        await Api.delete(`${RoutineApi.url}/${routineId}`,true,controller);
    }


}

class Search {
    constructor(search, page,items) {
        this.search = search;
        this.page = page;
        this.items = items;
    }
}

class RoutineBase{
    constructor(name,detail,isPublic,difficulty) {
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
    }
}

class Cycle{
    constructor(name,type,order,repetitions) {
        this.name = name;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
        this.detail = "";
    }
}