<template>
  <div class="generalContainer">
    <NavBar logged-in/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <Title :title-name="routineName"/>
          <textarea class="subtitle"></textarea>
        </div>

        <div class="dataDiv">
          Dificultad:Dificil<br>
          Duracion 30'
        </div>
      </div>
      <div class="mainSection">
        <h2 class="sectionTitle" style="color: #DC9F28">Entrada en Calor </h2>
        <div class="routineBlockDiv">
          <EditableRoutineBlock orange/>
          <EditableRoutineBlock orange/>
        </div>

        <h2 class="sectionTitle" style="color: #42b983">Ciclo de Ejercitacion A</h2>
        <div class="routineBlockDiv">
        </div>

        <h2 class="sectionTitle" style="color: #4D6DEB">Entrada en Calor</h2>
        <div class="routineBlockDiv">
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
export default {
  name: "EditRoutine",
  components: { EditableRoutineBlock, Title, Footer, NavBar},
  data() {
    return {
      routineName: "Rutina",
      description: "Mi rutina para entrenar brazos",
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
</style>