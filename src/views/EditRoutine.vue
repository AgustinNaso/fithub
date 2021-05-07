<template>
  <div class="generalContainer">
    <NavBar logged-in/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <Title to="" :title-name="routineName"/>
          <textarea class="subtitle"></textarea>
        </div>
        <div class="dataDiv">
          Dificultad:Dificil<br>
          Duracion 30'
        </div>
      </div>
      <button class="cycleButton" @click="addCycle()">Agregar ciclo</button>

      <div class="mainSection">
        <h2 class="sectionTitle" style="color: #DC9F28">Entrada en Calor </h2>
        <div class="routineBlockDiv">
          <div v-for="el in warmUp" :key="el.uuid">
            <EditableRoutineBlock orange :id="el.uuid" @removeExercise="removeExercise(warmUp,el.uuid)"/>
          </div>
          <img class="addButton" src="../assets/add-button-yellow.png"  @click="addExercise(warmUp)" alt=""/>
        </div>

        <div v-for="(el,index) in cycles" :key="index">
          <div class="cycleContainer">
            <h2 class="sectionTitle" style="color: #42b983"> Ciclo de Ejercitación {{index + 1}}</h2>
            <div class="buttonContainer">
              <button @click="removeCycle('routine',0)">Rem ciclo</button>
            </div>
            <div class="routineBlockDiv">
              <div v-for="el in cycles[index]" :key="el.uuid">
                <EditableRoutineBlock green :id="el.uuid" @removeExercise="removeExercise(cycles[index],el.uuid)"/>
              </div>
              <img class="addButton" src="../assets/add-button-green.png" @click="addExercise(cycles[index])"  alt=""/>
            </div>
          </div>
        </div>

        <h2 class="sectionTitle" style="color: rgba(78,100,188,0.8)">Enfriamiento </h2>
        <div class="routineBlockDiv">
          <div v-for="el in coolDown" :key="el.uuid">
            <EditableRoutineBlock blue :id="el.uuid" @removeExercise="removeExercise(coolDown,el.uuid)"/>
          </div>
          <img class="addButton" src="../assets/add-button-blue.png" @click="addExercise(coolDown)" alt=""/>
        </div>
      </div>
      <div class="finalSection">
        <button class="acceptBtn"> Registrar Cambios</button>
        <button class="cancelBtn"> Cancelar Cambios</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import EditableRoutineBlock from "../components/editableComponent/EditableRoutineBlock";
import UserStore from "@/stores/UserStore";
import router from "../routes";
export default {
  name: "EditRoutine",
  components: { EditableRoutineBlock, Title, Footer, NavBar},
  data() {
    return {
      store: UserStore,
      routineName: "Rutina",
      description: "Mi rutina para entrenar brazos",
      warmUp: [{nombre: "Flexiones", reps: 10, secs: 30, uuid: new  Date().getTime()}],
      coolDown: [{nombre: "Flexiones", reps: 10, secs: 30, uuid: new  Date().getTime()}],
      cycles: [],
      cycleIdx: 0,
    }
  },
  methods: {
    addCycle() {
      this.cycles.push([]);
      this.cycleIdx++;
    },
    addExercise(cycle) {
      cycle.push({nombre: "Flexiones", reps: 10, secs: 30, uuid: new  Date().getTime()});
    },
    removeExercise(array,key) {
          array.splice(array.findIndex(a => a.uuid === key), 1)
    },
    removeCycle(idx){
      this.cycles.splice(idx,1);
    },
    getDateTime() {
      return new  Date().getTime();
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
.generalContainer{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.routineBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color: #42b983;
  flex-direction: column;
}

.subtitle{
  font-size: 24px;
  color: #606360;
  margin-left:50px;
  resize: none;
  width: 30vw;
  height: 120px;
  border: solid 3px #42b983;
  border-radius: 20px;
  padding: 10px;
  outline: none;
}


.mainSection{
  margin-left:60px;
}

.routineBlockDiv{
  margin-top:20px;
  margin-bottom: 30px;
  display:flex;
  flex-wrap:wrap;
  align-items: center;

}

.routineIntro{
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  justify-content: space-between;
}

.titleDiv{
  display: flex;
  flex-direction: column;
}

.dataDiv{
  color: #5d6165;
  font-size: 20px;
  text-align: right;
  margin-right: 20px;
  margin-top: 20px;
  font-weight:700;
}

.finalSection{
  padding-top:60px;
  display:flex;
  border-top: #aeb3b1 3px dotted ;
  justify-content: space-evenly;

}


.cycleButton{
  align-self: center;
  width: 300px;
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
}

.acceptBtn,
.cancelBtn{
  background: none;
  width: 300px;
  padding: 12px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 30px;
  border: black 5px solid;
  cursor: pointer;
}

.acceptBtn{
  color: #31ae7a;
  border-color: #31ae7a ;
}

.cancelBtn{
  color: black;
  background: #FF3344;
  border-color: #d01212 ;
}

.acceptBtn:hover{
  background: #d3efe4;
  transition: 0.5s ease-in-out;
}

.cancelBtn:hover{
  background: #d45561;
  transition: 0.3s ease-in-out;
}

.addButton {
  height: 150px;
  margin-bottom: 25px;
}
</style>