<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="bodyContainer">
      <h1 v-show="noEx">Debes crear por lo menos un ejercicio antes de comenzar una rutina!</h1>
      <Title title-name="Crear Ejercicio" to="/myexercises"/>
      <div class="content">
        <img class="mainImg" src="../assets/undraw_workout_gcgu.svg" alt="activityTracker"/>
        <div class="completeInfo">
          <form @submit.prevent>
            <label class="textLabel">Nombre</label>
            <input class="textInput" type="text" name="name" v-model="nombre" maxlength="25">
            <label class="textLabel">Descripción</label>
            <textarea class="descBox" cols="30" rows="4" v-model="descripcion" maxlength="100"></textarea>
            <div class="checkbox">
              <div class="pBox">
                <input class="checkBtn" type="radio" id="exercise" value="exercise" v-model="actividad">
                <label for="exercise">Actividad</label>
              </div>
              <div class="pBox">
                <input class="checkBtn" type="radio" id="rest" value="rest" v-model="actividad">
                <label for="rest">Descanso</label>
              </div>
            </div>
            <div class="clicker" @click="createExercise"><button class="createbtn">Crear Ejercicio</button></div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Footer from "@/components/Footer";
import router from "@/routes";
import UserStore from "@/stores/UserStore";
import {ExerciseApi,Exercise} from "@/backend/exercises";

export default {
  name: "CreateExercise",
  components: {Footer, NavBar, Title},
  props:{
    noEx:Boolean,
  },
  data(){
    return{
      nombre:"",
      descripcion:"",
      actividad:"exercise",
      store: UserStore
    }
  },
  methods:{
    async createExercise(){
      const exercise = new Exercise(this.nombre,this.descripcion,this.actividad);
      try{
        await ExerciseApi.addExercise(exercise);
      }catch (e) {
        await alert(e);
      }
      await router.push("/myexercises");
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
  color: white;
  border: none;
  text-align: center;
  background-color: #42b983;
  border-radius: 25px;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  outline: none;
  width: 230px;
  height: 40px;
  cursor: pointer;
}



.mainImg {
  width: 400px;
}


@media (max-width: 1200px) {
  .mainImg{
    display: none;
  }
}

h1{
  color: #d01212;
  margin-left: 40px;
  margin-bottom: 10px;
}



</style>