import {UserApi,Credentials} from "@/backend/user";

const UserStore= {
    async logIn(username,password){
        const creds = await new Credentials(username,password);
        try {
            await UserApi.login(creds);
        }catch (error){
            alert(error.description);
            return false;
        }
        await localStorage.setItem("loggedIn","true");
        const data =  await UserApi.getCurrentUser();
        await localStorage.setItem("fullName", data.firstName + " " + data.lastName);
        await localStorage.setItem("img", data.avatarUrl);
        return true;
    },
    async logOut(){
        localStorage.setItem("loggedIn", "false");
        await UserApi.logout();
    },
    isLoggedIn() {
        return localStorage.getItem("loggedIn") === 'true';
    },
    getName(){
        return localStorage.getItem("fullName");
    },
    getImg(){
        return localStorage.getItem("img");
    }
}
export default UserStore