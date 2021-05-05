import {UserApi,Credentials} from "@/backend/user";

const UserStore= {
    async logIn(username,password){
        const creds = new Credentials(username,password);
        try {
            await UserApi.login(creds);
        }catch (error){
            return false;
        }
        localStorage.setItem("loggedIn","true");
        return true;
    },
    async logOut(){
        await UserApi.logout();
        localStorage.setItem("loggedIn", "false");
    },
    isLoggedIn() {
        return localStorage.getItem("loggedIn") === 'true';
    }
}
export default UserStore