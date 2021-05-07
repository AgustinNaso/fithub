<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="bodyContainer">
    <Title title-name="Crear Rutina" to="/myroutines"/>
      <div class="content">
        <div class="completeInfo">
          <form @submit.prevent>
            <label class="textLabel">Nombre</label>
            <input class="textInput" type="text" name="name" v-model="nombre" maxlength="25">
            <label class="textLabel">Descripción</label>
            <textarea class="descBox" cols="30" rows="4" v-model="descripcion" maxlength="100"></textarea>
            <label class="textLabel">Dificultad</label>
            <select class="textInput" v-model="dificultad">
              <option disabled value="" >Seleccione una dificultad</option>
              <option>rookie</option>
              <option>beginner</option>
              <option>intermediate</option>
              <option>advanced</option>
              <option>expert</option>
            </select>
            <div class="checkbox">
              <div class="pBox">
                <input class="checkBtn" type="radio" id="public" value="public" v-model="visibilidad">
                <label for="public">Pública</label>
              </div>
              <div class="pBox">
                <input class="checkBtn" type="radio" id="private" value="private" v-model="visibilidad">
                <label for="private">Privada</label>
              </div>
            </div>
            <div  class="clicker" @click="createRoutine"><button class="createbtn">Crear Rutina</button></div>
          </form>
        </div>
        <img class="mainImg" src="../assets/activity_tracker.svg" alt="activityTracker"/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Footer from "@/components/Footer";
import {RoutineBase, RoutineApi} from "@/backend/routines"
import router from "@/routes";
import UserStore from "@/stores/UserStore";
export default {
  name: "CreateRoutine",
  components: {Footer, NavBar, Title},
  data(){
    return{
      nombre:"",
      descripcion:"",
      dificultad:"beginner",
      visibilidad:"public",
      store: UserStore
    }
  },
  methods:{
    async createRoutine(){
      const routineBase = new RoutineBase(this.nombre,this.descripcion,this.visibilidad === 'public',this.dificultad);
      try{
        await RoutineApi.createRoutine(routineBase);
      }catch (e) {
        await alert(e);
      }
      await router.push("/editRoutine");
    }
  },
  created() {
    if (!this.store.isLoggedIn()) {
      router.push("/permissionDenied");
    }
  }
}
</script>

<style scoped>

div{
  overflow-x: hidden
}

.mainContainer{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  max-width: 100vw;
}

.bodyContainer {
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color: #42b983;
  width: auto;
  flex-direction: column;
}

.content{
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.completeInfo {
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.textLabel {
  color: #42b983;
  font-size: 25px;
  font-weight: 700;
  width: 100%;
  margin: 5px 0 8px 25px;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.textInput,
textarea {
  width: 100%;
  margin-left: 10px;
  border: solid 3px #42b983;
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  resize: none;
  outline: none;
  color: #42b983;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 15px 0 15px 25px;
}

.pBox {
  width: 140px;
  color: #42b983;
  font-size: 18px;
  font-weight: 700;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + *::before {
  content: "";
  display: inline-block;
  vertical-align: bottom;
  width: 1rem;
  height: 1rem;
  border-color: #42b983;
  border-radius: 50%;
  border-style: solid;
  margin-right: 0.3rem;
}

input[type="radio"]:checked + *::before {
  /*background: radial-gradient(#42b983 0%, #42b983 40%, transparent 50%, transparent);*/
  background-color: #42b983;
  border-color: #42b983;
}

.createbtn {
  color: #35a371;
  margin-right: 10px;
  text-align: center;
  padding: 8px 35px 8px 35px;
  background-color: inherit;
  border: 4px solid #42b983;
  border-radius: 25px;
  font-size: 26px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;
}

.createbtn:hover {
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}


.mainImg {
  width: 400px;
}


@media (max-width: 1200px) {
  .mainImg{
    display: none;
  }
}



</style>