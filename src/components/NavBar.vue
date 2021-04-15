<template>
  <nav>
    <router-link to="/"><h1>Fithub</h1></router-link>
    <div class="butContainer">
      <router-link to="/register"><button v-show="loggedIn" class="rgtbtn">Registrarse</button></router-link>
      <router-link to="/login"><button v-show="loggedIn" class="loginbtn">Ingresar</button></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    loggedIn:Boolean
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
  padding: 0 5vh 0 10vh;
}
h1{
  font-family: "Spartan", sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #42b983;
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
}

a{
  text-decoration: none;
}

</style>