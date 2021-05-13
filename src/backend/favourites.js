import { Api } from './api.js';

export { FavouritesApi };

class FavouritesApi {
    static get url() {
        return `${Api.baseUrl}/favourites`;
    }

    static async getFavourites(controller) {
        return await Api.get(`${FavouritesApi.url}?size=30`, true, controller);
    }

    static async setFavourite(id,controller) {
        return await Api.post(`${FavouritesApi.url}/${id}/`, true,null, controller);
    }

    static async deleteFavourite(id,controller) {
        return await Api.delete(`${FavouritesApi.url}/${id}/`, true, controller);
    }

}