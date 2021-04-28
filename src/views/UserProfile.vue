<template>
  <div class="mainContainer">
    <NavBar logged-in/>
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
            <img class="imgContainer" src = "../assets/johndoe.png" alt="user image">
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
  width: 50vw;
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
  width: 27vw;
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
  height: 55px;
  border-radius: 40px;
  border: 3px solid #707070;
  background: transparent;
  font-size: 30px;
  font-weight: 550;
  color: #707070;
  cursor: pointer;
  text-align: center;
  padding-top : 12px;
  transition: 0.2s ease-in-out;

}
.editButton:hover{
  background-color: rgba(64, 193, 139, 0.4);
  transition: 0.2s ease-in-out;
}

.pwdButton{
  width: 50%;
  height: 55px;
  border-radius: 40px;
  border: 3px solid #d01212;
  background: transparent;
  font-size: 30px;
  font-weight: 550;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  padding-top: 12px;
  transition: 0.2s ease-in-out;

}
.pwdButton:hover{
  background-color: #f7a6a6;
  transition: 0.2s ease-in-out;
}
</style>