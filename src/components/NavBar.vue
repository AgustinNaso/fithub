<template>
  <nav>
    <router-link to="/main"><h1>Fithub</h1></router-link>
    <div class="butContainer" v-show="!loggedIn && !logging">
      <router-link to="/register"><button class="rgtbtn">Registrarse</button></router-link>
      <router-link to="/login"><button class="loginbtn">Ingresar</button></router-link>
    </div>
    <div class="navContainer" v-show="loggedIn && !logging">
      <router-link to="/explore?page=1"><MainBtnNav text="Explorar" :selected="selected === 1"/></router-link>
      <router-link to="/myroutines"><MainBtnNav text="Mis Rutinas" :selected="selected === 2"/></router-link>
      <router-link to="/myexercises"><MainBtnNav text="Mis Ejercicios" :selected="selected === 3"/></router-link>
    </div>
    <ProfileNav :userStore="store" v-show="loggedIn" :user-img="userImg" :user-name="userName"/>
  </nav>
</template>

<script>
import ProfileNav from "@/components/ProfileNav";
import MainBtnNav from "./MainBtnNav";
import UserStore from "../stores/UserStore";

export default {
  name: "NavBar",
  components: {MainBtnNav, ProfileNav},
  props: {
    selected:Number,
    logging:Boolean
  },
  computed: {
    loggedIn: function(){
      return this.store.isLoggedIn();
    },
    userName: function(){
      return this.store.getName();
    },
    userImg: function(){
      return this.store.getImg();
    }
  },
  data() {
    return {
      store: UserStore,
    }
  },
}
</script>

<style scoped>
nav{
  height: 80px;
  background-color: #030b10;
  display: flex;
  color: #42b983;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5vw 0 5vw;
}
h1{
  height: 100%;
  font-family: "Spartan", sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #42b983;
  cursor: pointer;
}
.rgtbtn{
  color: #030b10;
  border: none;
  margin-right: 10px;
  text-align: center;
  padding: 8px 35px 8px 35px;
  background-color: #42b983;
  border-radius: 25px;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  outline: none;
}

.rgtbtn:hover {
  transition: 0.3s ease-in-out;
  background-color: #77c6a2;
  cursor: pointer;
}

.loginbtn{
  color: #42b983;
  margin-right: 8px;
  text-align: center;
  padding: 6px 30px 6px 30px;
  border: 3px solid #42b983;
  background-color: #030b10;
  border-radius: 25px;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}

.loginbtn:hover{
  transition: 0.3s ease-in-out;
  background-color: #0a2118;
  text-decoration: none;
}
.navContainer {
  height: 100%;
  display: flex;
}

a{
  text-decoration: none;
}

</style>