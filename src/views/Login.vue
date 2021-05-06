<template>
  <div class="outer">
    <NavBar logging></NavBar>
    <div class="loginBg">
      <h1 >Ingresar</h1>
      <form @submit.prevent>
        <Input  v-model="name" type="text" name="email" label="Email"/>
        <Input  v-model="password" type="password" name="password" label="Contraseña"/>
        <button class="clicker" @click="logIn">Ingresar</button>
        <AltLink to="/register" text="No tienes una cuenta? Registrarte"/>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Input from "../components/formComponents/Input";
import AltLink from "../components/formComponents/AltLink";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import UserStore from "../stores/UserStore";
import router from "../routes";

export default {
  name: "Login",
  components: {NavBar,Footer, Input,AltLink},
  data(){
    return{
      store: UserStore,
      name:'',
      password:'',
    }
  },
  methods:{
    async logIn() {
      await this.store.logIn(this.name,this.password);
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

.clicker{
  width: 100%;
}

button{
  width: 100%;
  height: 45px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 400;
  background: #42b983;
  color: #030b10;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover{
  background-color: #51cd94;
  transition: 0.2s ease-in-out;
}
</style>