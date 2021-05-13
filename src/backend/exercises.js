import { Api } from './api.js';

export { ExerciseApi, Exercise, Img };

class ExerciseApi {
    static get url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async getExercises(controller) {
        return await Api.get(`${ExerciseApi.url}?size=30`, true, controller);
    }

    static async getExerciseById(id,controller) {
        return await Api.get(`${ExerciseApi.url}/${id}`, true, controller);
    }

    static async editExercise(exercise, id,controller) {
        await Api.put(`${ExerciseApi.url}/${id}`, true, exercise, controller);
    }

    static async addExercise(exercise,controller) {
        return await Api.post(`${ExerciseApi.url}`, true, exercise, controller);
    }

    static async deleteExercise(exerciseId,controller){
        await Api.delete(`${ExerciseApi.url}/${exerciseId}`,true,controller);
    }

    static async getImgs(exerciseId,controller) {
        return await Api.get(`${ExerciseApi.url}/${exerciseId}/images`, true, controller);
    }

    static async addImg(exerciseId,img,controller) {
        return await Api.post(`${ExerciseApi.url}/${exerciseId}/images`, true, img, controller);
    }

    static async changeImg(exerciseId,imageId,controller){
        return await Api.put(`${ExerciseApi.url}/${exerciseId}/images/${imageId}`,true,controller);
    }

}

class Exercise {
    constructor(name, detail,type) {
        this.name = name;
        this.detail = detail;
        this.type = type;
    }
}

class Img {
    constructor(url) {
        this.number = 1;
        this.url = url;
    }
}