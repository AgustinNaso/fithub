<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <div class="errorMsg">
        <h1>¡Whoops!</h1>
        <p>No tiene los permisos requeridos para visualizar esta página</p>
      </div>
      <img src="../assets/undraw_cancel_u1it.svg" alt="No dispone de los permisos requeridos">
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default {
  name: "PermissionDenied",
  components: {Footer, NavBar}
}
</script>

<style scoped>

.mainContainer{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  max-width: 100vw;
}

.mainBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color: #399c70;
  justify-content: space-evenly;
  align-items: center;
}

h1{
  font-size: 96px;
}

p{
  font-size: 32px;
  color: #2c3e50;
  text-align: left;
  margin-left: 30px;
}

.errorMsg{
  display: flex;
  flex-direction: column;
  width:30vw;
}
img{
  width: 55vw;
}
</style>