<template>
  <div class="generalContainer">
    <NavBar logged-in/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <Title to="" :title-name="routineName"/>
          <textarea class="subtitle"></textarea>
          <button @click="addCycle()">Agg ciclo</button>
        </div>

        <div class="dataDiv">
          Dificultad:Dificil<br>
          Duracion 30'
        </div>
      </div>
      <div class="mainSection">
        <h2 class="sectionTitle" style="color: #DC9F28">Entrada en Calor </h2>
        <button @click="removeExcercise('warmUp',index)">Rem ejercicio</button>
        <div class="routineBlockDiv">
          <div v-for="exc in warmUp" :key="exc">
            <EditableRoutineBlock orange/>
          </div>
          <img class="addButton" src="../assets/add-button-yellow.png" @click="addExcercise('warmUp',index)" alt=""/>
        </div>
        <div v-for="(cyc,index) in cycles" :key="cyc">
          <div class="cycleContainer">
            <h2 class="sectionTitle" style="color: #42b983"> Ciclo de Ejercitación {{index + 1}}</h2>
            <div class="buttonContainer">
              <button @click="removeExcercise('routine',index)">Rem ejercicio</button>
              <button @click="removeCycle('routine',index)">Rem ciclo</button>
            </div>
            <div class="routineBlockDiv">
              <div v-for="ex in cycles[index]" :key="ex">
                <span><EditableRoutineBlock green/></span>
              </div>
              <img class="addButton" src="../assets/add-button-yellow.png" @click="addExcercise('routine',index)" alt=""/>
            </div>
          </div>
        </div>

        <h2 class="sectionTitle" style="color: #DC9F28">Enfriamiento </h2>
        <button @click="removeExcercise('coolDown',index)">Rem ejercicio</button>
        <div class="routineBlockDiv">
          <div v-for="exc in coolDown" :key="exc">
            <EditableRoutineBlock green/>
          </div>
          <img class="addButton" src="../assets/add-button-yellow.png" @click="addExcercise('coolDown',index)" alt=""/>

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
    addExcercise(cycle,idx) {
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
    removeExcercise(cycle,idx) {
      switch (cycle) {
        case "routine":
          this.cycles[idx].pop();
          break
        case "coolDown":
          this.coolDown.pop();
          break;
        case "warmUp":
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
  margin-bottom: 20px;
}
</style>