<template>
  <div class="outer">
    <NavBar logged-in/>
    <div class="mainBg">
    <Title title-name="Mi cuenta" to="./main"/>
      <div class="userContainer">
        <div class="userData">
          <div class="dataContainer">
            <p class="dataType">Email</p>
            <p class="dataInfo">facha@mail.com</p>
          </div>
          <div class="infoUnderline"/>
          <div class="dataContainer">
            <p class="dataType">Fecha de nacimiento</p>
            <p class="dataInfo">11/11/1984</p>
          </div>
          <div class="infoUnderline"/>
          <div class="dataContainer">
            <p class="dataType">País o Región</p>
            <p class="dataInfo">Buenos Aires</p>
          </div>
          <div class="infoUnderline"/>

        </div>
        <div class="userProf">
            <img class="imgContainer" src = "../assets/johndoe.png" alt="user image">
          <div class="nameContainer">John Doe</div>
        </div>
      </div>
    <div class="buttonContainer">
      <button  type="button" class="editButton">Editar Perfil</button>
      <button type="button" class="pwdButton">Cambiar Contraseña</button>
    </div>
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

.dataType, .dataInfo{
  padding-top: 45px;
  padding-bottom: 15px;
  padding-left: 15px;
  font-size: 25px;
}
.dataInfo {
  color: black;
}

.dataType {
  color: #31ae7a;
  font-weight: 700;
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
  transition: 0.2s ease-in-out;

}
.editButton:hover{
  background-color: rgba(158, 168, 163, 0.4);
  transition: 0.2s ease-in-out;
}

.editButton:active {
  background: transparent;
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
  transition: 0.2s ease-in-out;

}
.pwdButton:hover{
  background-color: #f7a6a6;
  transition: 0.2s ease-in-out;
}

.pwdButton:active {
  background: transparent;
}


.mainBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  flex-direction: column;
  color: #42b983;
}

.dataContainer{
  display: flex;
  justify-content: space-between;
}
</style>