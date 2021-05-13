<template>
  <div class="outer">
    <NavBar/>
    <div class="mainBg">
      <Title title-name="Mi cuenta" to="./userProfile"/>
      <div class="userContainer">
        <div class="userData">
          <div class="dataContainer">
            <label for="fName" class="dataType">Nombre</label>
            <input id="fName" v-model="userData.firstName" class="dataInfo" type="text">
          </div>
          <div class="infoUnderline"/>
          <div class="dataContainer">
            <label for="lName" class="dataType">Apellido</label>
            <input id="lName" v-model="userData.lastName" class="dataInfo" type="text">
          </div>
          <div class="infoUnderline"/>
          <div class="buttonContainer">
            <router-link to="/userProfile"><button type="button" class="cancelButton">Cancelar</button></router-link>
            <button @click="saveEdit" type="button" class="confirmButton">Confirmar Cambios</button>
          </div>
        </div>
        <div class="userProf">
          <img class="imgContainer" :src = "userData.avatarUrl" alt="add image">
          <div class="inputWrap">
            <div class="labelWrap">
              <img class="editImage" src="../assets/edit_picture.svg" alt="user image">
              <label class="labelForImg" for="image" style="color: black;">Imagen del usario</label>
            </div>
            <input id="image" class="imageInput" v-model="userData.avatarUrl">
          </div>
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
import {EditCredentials} from "@/backend/user";

export default {
  name: "EditProfile",
  components: { Footer, Title,NavBar},
  data(){
    return {
      store: UserStore,
      userData: {firstName:"",lastName:"",avatarUrl:""}
    }
  },
  methods: {
    async saveEdit(){
      let editCred;
      try {
        editCred = new EditCredentials(this.userData.firstName, this.userData.lastName, this.userData.avatarUrl);
        await UserApi.saveEdits(editCred);
      }
      catch (e){
        alert(e.message);
      }
      await this.store.saveName(this.userData.firstName,this.userData.lastName);
      await this.store.saveImg(this.userData.avatarUrl);
      await router.push('/userProfile');
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
  color:  #399c70;
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
  height: 30px;
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
  color: #399c70;
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
  margin-top: 120px;
  margin-left: 20px;
  display: flex;
  justify-content: space-evenly;

}

.confirmButton{
  width: 350px;
  border-radius: 25px;
  padding:10px;
  border: 4px solid  #399c70;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color:  #399c70;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}
.confirmButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.confirmButton:active {
  background: transparent;
}

.cancelButton{
  width: 200px;
  border-radius: 25px;
  padding: 10px;
  border: 4px solid #d01212;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}
.cancelButton:hover{
  background-color: #f7a6a6;
  transition: 0.3s ease-in-out;
  color: #950707;
}

.imageInput{
  width: 80%;
  height: 30px;
  border-radius: 12px;
  border: black 3px solid;
  font-size: 18px;
}

.cancelButton:active {
  background: transparent;
}

.labelWrap{
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
}

.inputWrap{
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
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

  .buttonContainer{
    margin-top:50px;
  }

  .inputWrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .labelWrap{
    width: 30%;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
  }

  .labelForImg{
    margin-top: 20px;
  }

}
</style>