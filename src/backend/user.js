import { Api } from './api.js';

export { UserApi, Credentials, RegisterCredentials };

class UserApi {
    static get url() {
        return `${Api.baseUrl}/users`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
    }

    static async register(registerCredentials, controller) {
        await Api.post(`${UserApi.url}/`, false, registerCredentials, controller);
    }

    static async logout(controller) {
        Api.post(`${UserApi.url}/logout`, true,null, controller).then();
        Api.token = undefined;
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class RegisterCredentials {
    constructor(firstName,lastName, password,email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTap79kn13Sgurfpg09M7HmNKOeD-KXh2c-qsaJ15lI3K4-LlZM0SQxJKocKembu_N1tEA&usqp=CAU';
        this.username = email;
    }
}