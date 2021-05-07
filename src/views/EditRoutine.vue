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
        <button @click="removeExercise('warmUp',0)">Rem ejercicio</button>
        <div class="routineBlockDiv">
          <div v-for="(el,idx) in warmUp" :key="idx">
            <EditableRoutineBlock orange :id="idx"/>
          </div>
<!--          @click="addExercise('warmUp',idx)"-->
          <img class="addButton" src="../assets/add-button-yellow.png"  @click="addExercise('warmUp',0)" alt=""/>
        </div>

        <div v-for="(el,index) in cycles" :key="index">
          <div class="cycleContainer">
            <h2 class="sectionTitle" style="color: #42b983"> Ciclo de Ejercitación {{index + 1}}</h2>
            <div class="buttonContainer">
              <button @click="removeExercise('routine',0)">Rem ejercicio</button>
              <button @click="removeCycle('routine',0)">Rem ciclo</button>
            </div>
            <div class="routineBlockDiv">
              <div v-for="(ex,idx) in cycles[index]" :key="idx">
                <span><EditableRoutineBlock green :id="idx"/> </span>
              </div>
              <img class="addButton" src="../assets/add-button-green.png" @click="addExercise('routine',0)"  alt=""/>

            </div>
          </div>
        </div>

        <h2 class="sectionTitle" style="color: rgba(78,100,188,0.8)">Enfriamiento </h2>
        <button @click="removeExercise('coolDown',0)">Remover ejercicio</button>
        <div class="routineBlockDiv">
          <div v-for="(el,idx) in coolDown" :key="idx">
            <EditableRoutineBlock blue/>
          </div>
          <img class="addButton" src="../assets/add-button-blue.png" @click="addExercise('coolDown',0)" alt=""/>
        </div>
      </div>
      <div class="finalSection">
        <button class="acceptBtn"> Registrar Cambios</button>s
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
      warmUp: [{ej:"facha"}],
      coolDown: [{ej:"fachero"}],
      cycles: [],
      cycleIdx: 0,
    }
  },
  methods: {
    addCycle() {
      this.cycles.push([]);
      this.cycleIdx++;
    },
    addExercise(cycle,idx) {
      switch (cycle){
        case "routine":
          this.cycles[idx].push({nombre: "Flexiones", reps: 10, secs: 30});
          break
        case "coolDown":
          this.coolDown.push("ES INCREIBLE");
          break;
        case "warmUp":
          this.warmUp.push("ES INCREIBLE");
          break;
        default:
          break;
      }
    },
    removeExercise(cycle,idx) {
      switch (cycle) {
        case 'routine':
          this.cycles[idx].pop();
          break
        case 'coolDown':
          this.coolDown.pop();
          break;
        case 'warmUp':
          this.warmUp.pop();
          break;
        default:
          break;
      }
    },
    removeCycle(idx){
      this.cycles.splice(idx,1);
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
  margin-left:60px;
  resize: none;
  width: 600px;
  height: 120px;
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