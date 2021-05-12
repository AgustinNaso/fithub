<template>
  <div class="mainContainer">
    <NavBar  :selected="3"/>
    <div class="mainBg">
      <div class="titleContainer">
        <Title title-name="Mis Ejercicios" to="/main"/>
        <router-link v-show="exercises && exercises.length !== 0" to="/createExercise"><button>Crear Ejercicio</button></router-link>
      </div>
      <div class="exerciseContainer">
        <div v-show="exercises && exercises.length === 0" class="newRoutineAlarm">
          <h1>¡No tiene ningún ejercicio todavía!</h1>
          <router-link class="large" to="createExercise"><button class="large">Crear Ejercicio</button></router-link>
        </div>
        <Exercise
            v-for="(exercise) in exercises"
            :id="exercise.id"
            :key="exercise.id"
            :is-activity="exercise.type === 'exercise'"
            class="exercise"
            :title="exercise.name"
            :description="exercise.detail"
            @deleteExercise="deleteExercise($event)"
        />
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import Exercise from "../components/Exercise";
import router from "@/routes";
import UserStore from "@/stores/UserStore";
import {ExerciseApi} from "@/backend/exercises";

export default {
  name: "MyExercises",
  components: {Exercise, Title, Footer, NavBar},
  data() {
    return {
      store: UserStore,
      exercises: undefined
    }
  },
  created() {
    if (!this.store.isLoggedIn()) {
      router.push("/permissionDenied");
    }
    ExerciseApi.getExercises().then((value) => {
      this.exercises = value.content;
    });
  },
  methods:{
    deleteExercise: async function(id){
      try{
        await ExerciseApi.deleteExercise(id)
        this.exercises.splice(this.exercises.findIndex(exercise => exercise.id === id), 1);
      }catch (e){
        alert(e);
      }
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

.mainBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  flex-direction: column;
  color: #399c70;
}

.exerciseContainer{
  display: flex;
  flex-direction: column;
}

.exercise{
  margin-left: 50px;
  margin-bottom: 5px;
}

.titleContainer{
  display: flex;
  width: 100%;
}

button{
  color: #399c70;
  margin-right: 10px;
  text-align: center;
  padding: 8px 35px 8px 35px;
  background-color: inherit;
  border: 4px solid #399c70;
  border-radius: 25px;
  font-size: 26px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;
}
button:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

a{
  width: 360px;
}

.newRoutineAlarm{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

}
.large{
  width: 400px;
  margin-top: 10px;
}
</style>