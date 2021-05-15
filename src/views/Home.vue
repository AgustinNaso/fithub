<template>
  <div class="homeWrap">
    <NavBar />
    <div class="homeBg">
      <div class="homeSection">
        <h1>Entrena gratis, en cualquier lado.</h1>
        <p>
          ¡Con <b>Fithub</b> podes conectarte crear tus rutinas y compartirlas con gente de todo el mundo! <br />
          <br />
          <b>Entrenamiento de persona a persona, sin intermediario.</b>
        </p>
        <div class="butContainer">
          <router-link to="/main"><button class="explorebtn">Explorar Rutinas</button></router-link>
        </div>
      </div>
      <router-link to="/userProfile"><img src="../assets/hero.svg" alt="Training"/></router-link>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import router from "@/routes";
import UserStore from "@/stores/UserStore";
export default {
  name: "Home",
  components: { Footer, NavBar},
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
.homeBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color:  #399c70;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}
h1{
  font-size: 48px;
  line-height: 1;
  margin: 0;
  padding-bottom: 12px;
}
.homeSection{
  margin-left: 0;
  display: flex;
  flex-direction: column;
  width: 40vw;
  align-items: center;
  justify-content: center;
}
p{
  font-size: 20px;
  color: #030b10;
  margin:0 30px 0 40px;
  text-align: right;
}
img{
  width: 35vw;
  -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
  filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.4));
}
.homeWrap{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.explorebtn {
  color:  #399c70;
  margin-right: 10px;
  text-align: center;
  padding: 8px 35px 8px 35px;
  background-color: inherit;
  border: 4px solid  #399c70;
  border-radius: 25px;
  font-size: 26px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;
}

.explorebtn:hover {
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.butContainer {
  margin-top: 30px;
  align-self: flex-end;
}

</style>