<template>
  <div class="homeWrap">
    <NavBar />
    <div class="homeBg">
      <div class="homeSection">
        <h1>Entrena gratis, en cualquier lado.</h1>
        <p>
          Con <b>FitHub</b> podes conectarte con otros xxxx de tu xxxx que
          no se que escribir aca! <br />
          <br />
          <b>Entrenamiento de persona a persona, sin intermediario.</b>
        </p>
        <div class="butContainer">
          <router-link to="/main"><button class="explorebtn">Explorar Rutinas</button></router-link>
          <router-link to="/register"><button class="rgtbtn">Registrarse</button></router-link>
        </div>
      </div>
      <img src="../assets/hero.svg" alt="Training"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default {
  name: "Home",
  components: { Footer, NavBar}
}
</script>

<style scoped>
.homeBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color: #42b983;
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

.rgtbtn{
  color: #030b10;
  margin-right: 10px;
  text-align: center;
  border: 4px solid #42b983;
  padding: 8px 35px 8px 35px;
  background-color: #42b983;
  border-radius: 25px;
  font-size: 26px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
}

.explorebtn {
  color: #35a371;
  margin-right: 10px;
  text-align: center;
  padding: 8px 35px 8px 35px;
  background-color: inherit;
  border: 4px solid #42b983;
  border-radius: 25px;
  font-size: 26px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  margin-bottom: 10px;

}

.rgtbtn:hover {
  transition: 0.3s ease-in-out;
  background-color: #77c6a2;
  border-color: #77c6a2;
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