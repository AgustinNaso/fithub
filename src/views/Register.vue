<template>
  <div class="outer">
    <NavBar logging></NavBar>
    <div class="loginBg">
      <h2 v-show="success">¡Registro exitoso! Te mandamos un email para que confirmes tu cuenta</h2>
      <h1 v-show="!loading">Registrarse</h1>
      <form @submit.prevent v-show="!loading">
        <div class="nameBox">
          <Input v-model="name" type="text" name="name" label="Nombre*" small :error-msg="nameErrMsg" maxlength="12"/>
          <Input v-model="surname" type="text" name="surname" label="Apellido*" small :error-msg="surNameErrMsg" maxlength="12"/>
        </div>
        <Input v-model="email" type="email" name="email" label="Email*" :error-msg="emailErrMsg"/>
        <Input v-model="password" type="password" name="password" label="Contraseña*" :error-msg="passErrMsg"/>
        <Input v-model="passwordConf"  type="password" name="passwordConf" label="Confirmar Contraseña*" :error-msg="confPassErrMsg"/>
        <div  class="clicker" @click="register"><FormBtn text="Registrarse"/></div>
        <AltLink to="/login" text="¿Ya tienes una cuenta? Ingresar"/>
      </form>
      <h3 v-show="loading">Evaluando tu registro...</h3>
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
import {isEmpty, validateEmail, matching} from "@/backend/checks";

export default {
  name: "Login",
  components: {NavBar,Footer, FormBtn, Input,AltLink},
  data(){
    return{
      store: UserStore,
      name:"",
      surname:"",
      email:"",
      password:"",
      passwordConf:"",
      nameErrMsg:'',
      surNameErrMsg:'',
      emailErrMsg:'',
      passErrMsg:'',
      confPassErrMsg:'',
      success:false,
      loading:false,
    }
  },
  methods: {
    async register(){
      this.loading = true;
      let registerCred;
      this.passErrMsg = '';
      this.nameErrMsg = '';
      this.surNameErrMsg = '';
      this.confPassErrMsg = '';
      this.emailErrMsg = '';

      if (!validateEmail(this.email) || isEmpty(this.email)){
        this.emailErrMsg = "El email ingresado no es valido.";
      }
      if (isEmpty(this.name)){
        this.nameErrMsg = "Campo vacio";
      }
      if (isEmpty(this.surname)){
        this.surNameErrMsg = "Campo vacio";
      }
      if (isEmpty(this.password)){
        this.passErrMsg = "Debe ingresar una contraseña";
      }

      if (!matching(this.password,this.passwordConf)){
        this.passErrMsg = " ";
        this.confPassErrMsg = "Las contraseñas deben coincidir"
      }

      if (this.nameErrMsg || this.surNameErrMsg || this.passErrMsg || this.confPassErrMsg || this.emailErrMsg){
        this.loading = false;
        return;
      }

      try {
        registerCred = await new RegisterCredentials(this.name, this.surname, this.password, this.email);
        await UserApi.register(registerCred);
        this.name="";
        this.surname="";
        this.email="";
        this.password="";
        this.passwordConf="";
        this.loading= false;
        this.success = true;
      }
      catch (e){
        this.loading= false;
        this.emailErrMsg = "Ya se encuentra una cuenta con estas credenciales";

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
  color: #399c70;
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

h2{
  color: white;
  margin-bottom: 30px;
}

h3{
  margin-top:50px;
  font-size: 80px;
  color: #77c6a2;
}
</style>