<template>
  <div class="mainContainer">
    <NavBar/>
      <Title title-name="Mi cuenta" to="./main"/>
      <div class="userContainer">
        <div class="userData">
          <div class="dataInfo">Email</div>
          <div class="infoUnderline"/>
          <div class="dataInfo">Fecha de Nacimiento</div>
          <div class="infoUnderline"/>
          <div class="dataInfo">País o Región</div>
          <div class="infoUnderline"/>
        </div>
        <div class="userProf">
          <img class="imgContainer" src = "../assets/logo.png" alt="user image">
          <div class="nameContainer">John Doe</div>
        </div>
      </div>
    <div class="buttonContainer">
      <div class="editButton">Editar Perfil</div>
      <div class="pwdButton">Cambiar Contraseña</div>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title";
import NavBar from "../components/NavBar";
export default {
  name: "UserProfile",
  components: {Title,NavBar}
}
</script>

<style scoped>

.dataInfo{
  padding-top: 45px;
  padding-bottom: 15px;
  padding-left: 15px;
  font-size: 25px;
  color: #39a375;
}

.infoUnderline{
  height: 2px;
  background-color: #707070;
  width: 650px
}

.userContainer {
  display: flex;
  justify-content: space-evenly;
  height: 90%;
  margin-top: -35px;
  margin-left: -20px;
}

.userProf {
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 450px;
  align-items: center;
  background: linear-gradient(0, rgba(36, 56, 48, 0.53), rgba(46, 173, 120, 0.56));
  border-radius: 40px;
  justify-content: space-evenly;
}

.imgContainer {
  height: 300px;
  width: 300px;
  box-shadow: 4px 10px 20px rgba(0,0,0,0.57);
  border-radius: 50%;
}

.nameContainer {
  font-size: 52px;
  text-align: center;
  color: whitesmoke;
  text-shadow: 0 3px 6px rgba(0,0,0,0.57);

}

.userData {
  width: 50vw;
  height: 50vh;
}

.buttonContainer{
  width: 50vw;
  height: 50vh;
  margin-top: -100px;
  margin-left: 50px;
  display: flex;
  justify-content: space-evenly;
}

.editButton{
  width: 35%;
  height: 50px;
  border-radius: 12px;
  border: 3px solid #0a2118;
  background: transparent;
  font-size: 30px;
  font-weight: 400;
  color: #0a2118;
  cursor: pointer;
  text-align: center;
}
.editButton:hover{
  background-color: #51cd94;
  transition: 0.2s ease-in-out;
}

.pwdButton{
  width: 50%;
  height: 50px;
  border-radius: 12px;
  border: 3px solid #ba281e;
  background: transparent;
  font-size: 30px;
  font-weight: 400;
  color: #ba281e;
  cursor: pointer;
  text-align: center;
}
.pwdButton:hover{
  background-color: #f7a6a6;
  transition: 0.2s ease-in-out;
}
</style>