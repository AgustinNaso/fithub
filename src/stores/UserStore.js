const UserStore= {
    logIn(){
        localStorage.setItem("loggedIn","true");
    },
    logOut(){
        localStorage.setItem("loggedIn", "false");
    },
    isLoggedIn() {
        return localStorage.getItem("loggedIn") === 'true';
    }
}
export default UserStore