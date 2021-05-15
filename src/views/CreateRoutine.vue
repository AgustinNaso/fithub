<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="bodyContainer">
    <Title title-name="Crear Rutina" to="/myroutines"/>
      <div class="content">
        <div class="completeInfo">
          <form @submit.prevent>
            <label for="name" class="textLabel">Nombre</label>
            <input id="name" class="textInput" type="text" name="name" v-model="nombre" maxlength="25">
            <p v-show="emptyName">¡El nombre no puede ser un valor vacío!</p>
            <label for="desc" class="textLabel">Descripción</label>
            <textarea id="desc" class="descBox" cols="30" rows="4" v-model="descripcion" maxlength="100"></textarea>
            <label class="textLabel">Dificultad</label>
            <select class="textInput" v-model="dificultad">
              <option disabled value="" >Seleccione una dificultad</option>
              <option value="rookie">Novato</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
              <option value="expert">Experto</option>
            </select>
            <div class="checkbox">
              <div class="pBox">
                <input class="checkBtn" type="radio" id="public" value="public" v-model="visibilidad">
                <label style="font-size: 20px" for="public">Pública</label>
              </div>
              <div class="pBox">
                <input class="checkBtn" type="radio" id="private" value="private" v-model="visibilidad">
                <label style="font-size: 20px" for="private">Privada</label>
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
import {RoutineBase, RoutineApi, Cycle} from "@/backend/routines"
import router from "@/routes";
import UserStore from "@/stores/UserStore";
import {ExerciseApi} from "@/backend/exercises";
import {isEmpty} from "@/backend/checks";
export default {
  name: "CreateRoutine",
  components: {Footer, NavBar, Title},
  data(){
    return{
      nombre:"",
      descripcion:"",
      dificultad:"beginner",
      visibilidad:"public",
      store: UserStore,
      emptyName:false,
    }
  },
  methods:{
    async createRoutine(){
      this.emptyName=false;
      if (isEmpty(this.nombre)){
        this.emptyName=true;
        return;
      }
      const routineBase = new RoutineBase(this.nombre,this.descripcion,this.visibilidad === 'public',this.dificultad);
      let data;
      try{
        data = await RoutineApi.createRoutine(routineBase);
        const warmUp = new Cycle("Entrada en Calor",'warmup',1,1);
        const coolDown = new Cycle("Enfriamiento",'cooldown',2,1);
        const training = new Cycle("Ciclo de Ejercitación",'exercise',3,1);
        await RoutineApi.addCycle(data.id,warmUp);
        await RoutineApi.addCycle(data.id,coolDown);
        await RoutineApi.addCycle(data.id,training);
      }catch (e) {
        await alert(e);
      }
      await router.push(`/editRoutine/${data.id}`);
    }
  },
  async created() {
    if (!this.store.isLoggedIn()) {
      router.push("/permissionDenied");
    }
    const ex = await ExerciseApi.getExercises();
    if (ex.totalCount === 0){
      await router.push({ name: 'createExercise', params: {returnAdd: "/createRoutine" } })
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
  color: #399c70;
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
  color: #399c70;
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
  border: solid 3px #399c70;
  font-weight: 700;
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  resize: none;
  outline: none;
  color: #399c70;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 15px 0 15px 25px;
}

.pBox {
  width: 140px;
  color:  #399c70;
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
  border-color: #399c70;
  border-radius: 50%;
  border-style: solid;
  margin-right: 0.3rem;
}

input[type="radio"]:checked + *::before {
  /*background: radial-gradient(#399c70 0%, #399c70 40%, transparent 50%, transparent);*/
  background-color: #399c70;
  border-color: #399c70;
}

.createbtn {
  color: white;
  border: none;
  text-align: center;
  background-color: #399c70;
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

p{
  color: red;
  font-weight: 700;
  margin-left: -30px;
}
@media (max-width: 1200px) {
  .mainImg{
    display: none;
  }
}



</style>