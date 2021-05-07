import { Api } from './api.js';

export { CycleApi };

class CycleApi {
    static get url() {
        return `${Api.baseUrl}/cycles`;
    }

    static async getCycleExercises(cycleId,controller) {
        return await Api.get(`${CycleApi.url}/${cycleId}/exercises`, true, controller);
    }

}
