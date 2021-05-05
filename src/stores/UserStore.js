const UserStore= {
    loggedIn : true,
    logIn(){
        this.loggedIn = true
        this.setState();
    },
    logOut(){
        this.loggedIn = false;
        this.setState();
    },
    isLoggedIn() {
        return this.loggedIn;
    },
    setState(){
        localStorage.setItem("loggedIn",this.loggedIn);
    }
}
export default UserStore