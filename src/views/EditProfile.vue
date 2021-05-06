<template>
  <div class="outer">
    <NavBar/>
    <div class="mainBg">
      <Title title-name="Mi cuenta" to="./userProfile"/>
      <div class="userContainer">
        <div class="userData">
          <div class="dataContainer">
            <p class="dataType">Nombre</p>
            <input v-model="userData.firstName" class="dataInfo" type="text">
          </div>
          <div class="infoUnderline"/>
          <div class="dataContainer">
            <p class="dataType">Apellido</p>
            <input v-model="userData.lastName" class="dataInfo" type="text">
          </div>
          <div class="infoUnderline"/>
          <div class="buttonContainer">
            <button  type="button" class="confirmButton">Confirmar Cambios</button>
            <router-link to="/userProfile"><button type="button" class="cancelButton">Cancelar</button></router-link>
          </div>
        </div>
        <div class="userProf">
          <img class="imgContainer" :src = "store.getImg()" alt="add image">
          <img class="editImage" src="../assets/edit_picture.svg">
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Title from "../components/Title";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import router from "@/routes";
import UserStore from "@/stores/UserStore";
import {UserApi} from "@/backend/user";

export default {
  name: "EditProfile",
  components: {Footer, Title,NavBar},
  data(){
    return {
      store: UserStore,
      userData: {firstName:"",lastName:""}
    }
  },
  async created() {
    if (!this.store.isLoggedIn()) {
      router.push("/permissionDenied");
    }
    this.userData =  await UserApi.getCurrentUser();
  }
}
</script>

<style scoped>

.outer{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  max-width: 100vw;
}

.dataType{
  color: #31ae7a;
  font-weight: 700;
  font-size: 25px;
}
.dataInfo {
  color: black;
  background: none;
  height: 35px;
  font-size: 25px;
  border: #5d6165 2px solid;
  border-radius: 12px;
  padding: 3px;
  outline: none;
  width: 300px;
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

.editImage {
  height: 50px;
  width: auto;
}

.userData {
  width: 50vw;
  height: 50vh;
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

.buttonContainer{
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  justify-content: space-evenly;
}


.confirmButton{
  width: 350px;
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
.confirmButton:hover{
  background-color: rgba(158, 168, 163, 0.4);
  transition: 0.2s ease-in-out;
}

.confirmButton:active {
  background: transparent;
}

.cancelButton{
  width: 200px;
  border-radius: 40px;
  padding: 10px;
  border: 3px solid #d01212;
  background: transparent;
  font-size: 30px;
  font-weight: 550;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  transition: 0.2s ease-in-out;

}
.cancelButton:hover{
  background-color: #f7a6a6;
  transition: 0.2s ease-in-out;
}

.cancelButton:active {
  background: transparent;
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

  .editImage {
    height: 40px;
    width: auto;
    margin-top: 20px;
  }

  .userData{
    width: 80%;
    align-items: center;
    justify-content: center;
  }

}
</style>