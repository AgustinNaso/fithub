<template>
  <div class="outer">
    <NavBar logging></NavBar>
    <div class="loginBg">
      <h1>Registrarse</h1>
      <form @submit.prevent>
        <div class="nameBox">
          <Input v-model="name" type="text" name="name" label="Nombre*" small/>
          <Input v-model="surname" type="text" name="surname" label="Apellido*" small/>
        </div>
        <Input v-model="email" type="email" name="email" label="Email*"/>
        <Input v-model="password" type="password" name="password" label="Contraseña*"/>
        <Input v-model="passwordConf"  type="password" name="passwordConf" label="Confirmar contraseña*"/>
        <div  class="clicker" @click="register"><FormBtn text="Registrarse"/></div>
        <AltLink to="/login" text="Ya tienes una cuenta? Ingresar"/>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Input from "../components/formComponents/Input";
import FormBtn from "../components/formComponents/FormBtn";
import AltLink from "../components/formComponents/AltLink";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import UserStore from "@/stores/UserStore";
import router from "@/routes";
import {RegisterCredentials, UserApi} from "@/backend/user";

export default {
  name: "Login",
  components: {NavBar,Footer, FormBtn, Input,AltLink},
  data(){
    return{
      store: UserStore,
      name:"",
      surname:"",
      password:"",
      passwordConf:"",
      email:"",
    }
  },
  methods: {
    register(){
      let registerCred;
      try {
        registerCred = new RegisterCredentials(this.name, this.surname, this.password, this.email);
        UserApi.register(registerCred);

      }
      catch (e){
        alert(e.message);
      }
    }
  },
  created() {
    if (this.store.isLoggedIn()){
      router.push("main");
    }
  }
}
</script>

<style scoped>
.outer{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.loginBg{
  padding: 100px;
  flex:1;
  background-color: #030b10;
  display: flex;
  color: #42b983;
  align-items: center;
  flex-direction: column;
}
form{
  padding: 30px 35px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.nameBox{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.clicker{
  width: 100%;
}

</style>