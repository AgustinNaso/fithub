<template>
  <div class="outer">
    <NavBar logging></NavBar>
    <div class="loginBg">
      <h1>Registrarse</h1>
      <form>
        <div class="nameBox">
          <Input type="text" name="name" label="Nombre" small/>
          <Input type="text" name="surname" label="Apellido" small/>
        </div>
        <Input type="email" name="email" label="Email"/>
        <Input type="password" name="password" label="Contraseña"/>
        <Input type="password" name="passwordConf" label="Confrimar contraseña"/>
        <FormBtn text="Registrarse"/>
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

export default {
  name: "Login",
  components: {NavBar,Footer, FormBtn, Input,AltLink},
  data(){
    return{
      store: UserStore
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
</style>