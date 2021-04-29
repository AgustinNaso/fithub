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

            <div class="buttonContainer">
              <button  type="button" class="editButton">Editar Perfil</button>
              <button type="button" class="pwdButton">Cambiar Contraseña</button>
            </div>

          </div>
          <div class="userProf">
              <img class="imgContainer" src = "../assets/johndoe.png" alt="user image">
            <div class="nameContainer">John Doe</div>
          </div>
        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Title from "../components/Title";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";
export default {
  name: "UserProfile",
  components: {Footer, Title,NavBar}
}
</script>

<style scoped>

.outer{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  max-width: 100vw;
}

.dataInfo {
  color: black;
  font-size: 25px;
}

.dataType {
  color: #31ae7a;
  font-weight: 700;
  font-size: 25px;
}

.infoUnderline{
  height: 2px;
  background-color: #707070;
  width: 100%;
}

.userContainer {
  display: flex;
  justify-content: space-evenly;
  height: 90%;
  margin-top: -10px;
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
  object-fit:cover;
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
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  justify-content: space-evenly;
}

.editButton{
  width: 35%;
  border-radius: 40px;
  padding:10px;
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
  border-radius: 40px;
  border: 3px solid #d01212;
  background: transparent;
  font-size: 30px;
  font-weight: 550;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  transition: 0.2s ease-in-out;
  padding:10px;



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
  align-items: center;
  padding-top: 45px;
  padding-bottom: 15px;
  padding-left: 15px;
}

@media (max-width: 1200px) {

  .userContainer{
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .userProf{
    width: 80%;
    height: 340px;
    margin-top: 30px;
    justify-content: center;
  }

  .imgContainer{
    width: 200px;
    height: 200px;
  }
  .userData{
    width: 80%;
    align-items: center;
    justify-content: center;
  }
  
}
</style>