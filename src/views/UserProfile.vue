<template>
  <div class="outer">
    <NavBar />
      <div class="mainBg">
      <Title title-name="Mi cuenta" to="./main"/>
        <div class="userContainer">
          <div class="userData">
            <div class="dataContainer">
              <p class="dataType">Nombre</p>
              <p class="dataInfo">{{ userData.firstName }}</p>
            </div>
            <div class="infoUnderline"/>
            <div class="dataContainer">
              <p class="dataType">Apellido</p>
              <p class="dataInfo">{{ userData.lastName }}</p>
            </div>
            <div class="infoUnderline"/>
            <div class="dataContainer">
              <p class="dataType">Email</p>
              <p class="dataInfo">{{ userData.email }}</p>
            </div>
            <div class="infoUnderline"/>

            <div class="buttonContainer">
              <router-link to="/editProfile"><button  type="button" class="editButton">Editar Perfil</button></router-link>
            </div>

          </div>
          <div class="userProf">
              <img class="imgContainer" :src = "store.getImg()" alt="">
            <div class="nameContainer">{{ store.getName() }}</div>
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
import router from "@/routes";
import UserStore from "@/stores/UserStore";
import {UserApi} from "@/backend/user";

export default {
  name: "UserProfile",
  components: {Footer, Title,NavBar},
  data(){
    return{
      store: UserStore,
      userData: {email:"",firstName:"",lastName:""}
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

.dataInfo {
  color: black;
  font-size: 25px;
}

.dataType {
  color: #399c70;
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
  width: 270px;
  border-radius: 25px;
  padding:10px;
  border: 4px solid #399c70;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #399c70;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}
.editButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.editButton:active {
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