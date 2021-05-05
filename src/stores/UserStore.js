import {UserApi,Credentials} from "@/backend/user";

const UserStore= {
    async logIn(username,password){
        const creds = new Credentials(username,password);
        try {
            await UserApi.login(creds);
        }catch (error){
            alert(error.description);
            return false;
        }
        localStorage.setItem("loggedIn","true");
        return true;
    },
    async logOut(){
        localStorage.setItem("loggedIn", "false");
        await UserApi.logout();
    },
    isLoggedIn() {
        return localStorage.getItem("loggedIn") === 'true';
    }
}
export default UserStore