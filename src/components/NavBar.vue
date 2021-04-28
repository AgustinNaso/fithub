<template>
  <nav>
    <router-link to="/"><h1>Fithub</h1></router-link>
    <div class="butContainer" v-show="!loggedIn">
      <router-link to="/register"><button class="rgtbtn">Registrarse</button></router-link>
      <router-link to="/login"><button class="loginbtn">Ingresar</button></router-link>
    </div>
    <div class="navContainer" v-show="loggedIn">
      <router-link to="/"><MainBtnNav text="Explorar" :selected="selected === 1"/></router-link>
      <router-link to="/"><MainBtnNav text="Mis Rutinas" :selected="selected === 2"/></router-link>
      <router-link to="/createRoutine"><MainBtnNav text="Crear Rutina" :selected="selected === 3"/></router-link>
    </div>
    <ProfileNav v-show="loggedIn" user-img="https://static1.bigstockphoto.com/1/7/2/large1500/27169880.jpg" user-name="Juan Doe"/>
  </nav>
</template>

<script>
import ProfileNav from "@/components/ProfileNav";
import MainBtnNav from "./MainBtnNav";
export default {
  name: "NavBar",
  components: {MainBtnNav, ProfileNav},
  props: {
    loggedIn:Boolean,
    selected:Number
  }
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