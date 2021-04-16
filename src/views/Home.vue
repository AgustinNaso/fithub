<template>
  <div class="homeWrap">
    <NavBar logged-in/>
    <div class="homeBg">
      <div class="homeSection">
        <h1>Entrena gratis, en cualquier lado.</h1>
        <p>
          Con <b>Healthify</b> podes conectarte con otros xxxx de tu xxxx que
          no se que escribir aca! <br />
          <br />
          <b>Entrenamiento de persona a persona, sin intermediario.</b>
        </p>
      </div>
      <img src="../assets/hero.svg" alt="Training">
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";
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
  width: 35vw;
  align-items: center;
  justify-content: center;
}
p{
  font-size: 20px;
  color: #030b10;
  margin-left: 80px;
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
</style>