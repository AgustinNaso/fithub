import { Api } from './api.js';

export { ExerciseApi, Exercise };

class ExerciseApi {
    static get url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async getExercises(controller) {
        return await Api.get(`${ExerciseApi.url}`, true, controller);
    }

    static async addExercise(exercise,controller) {
        await Api.post(`${ExerciseApi.url}`, true, exercise, controller);
    }



}

class Exercise {
    constructor(name, detail,type) {
        this.name = name;
        this.detail = detail;
        this.type = type;
    }
}