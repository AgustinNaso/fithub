import { Api } from './api.js';

export { UserApi, Credentials, RegisterCredentials, EmailVerifier, EditCredentials };

class UserApi {
    static get url() {
        return `${Api.baseUrl}/users`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        await localStorage.setItem("token",result.token);
        Api.token = result.token;
    }

    static async register(registerCredentials, controller) {
        await Api.post(`${UserApi.url}/`, false, registerCredentials, controller);
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true,null, controller);
        Api.token = undefined;
    }

    static async verifyEmail(emailVerifier,controller){
        await  Api.post(`${UserApi.url}/verify_email`,false,emailVerifier,controller)
    }

    static async getCurrentUser(controller) {
        return await Api.get(`${UserApi.url}/current`, true, controller);
    }

    static async saveEdits(editCredentials, controller) {
        await Api.put(`${UserApi.url}/current`, true, editCredentials, controller);
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

class EditCredentials {
    constructor(firstName,lastName,avatarUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
    }
}

class EmailVerifier{
    constructor(email,code) {
        this.code = code;
        this.email = email;
    }
}