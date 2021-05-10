import { Api } from './api.js';

export { CycleApi, CycleExercise };

class CycleApi {
    static get url() {
        return `${Api.baseUrl}/cycles`;
    }

    static async getCycleExercises(cycleId,controller) {
        return await Api.get(`${CycleApi.url}/${cycleId}/exercises`, true, controller);
    }

    static async addCycleExercise(cycleId,exerciseId, exercise, controller) {
        return await Api.post(`${CycleApi.url}/${cycleId}/exercises/${exerciseId}`, true, exercise, controller);
    }

    static async editCycleExercise(cycleId,exerciseId, exercise,controller) {
        return await Api.put(`${CycleApi.url}/${cycleId}/exercises/${exerciseId}`, true, exercise, controller);
    }

    static async removeCycleExercise(cycleId,exerciseId,controller) {
        return await Api.delete(`${CycleApi.url}/${cycleId}/exercises/${exerciseId}`, true, controller);
    }

}


class CycleExercise {
    constructor(order, duration,repetitions) {
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}