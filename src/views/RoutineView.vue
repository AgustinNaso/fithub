<template>
  <div class="generalContainer">
    <NavBar/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <Title to="" :title-name="routineName"/>
          <p class="subtitle">{{description}}</p>
        </div>

        <div class="dataDiv">
          Dificultad:Dificil<br>
          Duracion 30'
        </div>
      </div>
      <div class="mainSection">
        <h2 class="sectionTitle" style="color: #DC9F28">Entrada en Calor </h2>
        <div class="routineBlockDiv">
          <RoutineBlock v-for="(rout,idx) in warmUp" :key="idx" :orange="rout.name !== 'Descanso'" :excercise-name="rout.name" :reps="rout.reps" :secs="rout.secs" />
        </div>

        <h2 class="sectionTitle" style="color: #42b983">Ciclo de Ejercitacion A</h2>
        <div class="routineBlockDiv">
          <RoutineBlock v-for="(rout,idx) in cycle" :key="idx" :green="rout.name !== 'Descanso'" :excercise-name="rout.name" :reps="rout.reps" :secs="rout.secs" />
        </div>

        <h2 class="sectionTitle" style="color: #4D6DEB">Entrada en Calor</h2>
        <div class="routineBlockDiv">
          <RoutineBlock v-for="(rout,idx) in cooldown" :key="idx" :blue="rout.name !== 'Descanso'" :excercise-name="rout.name" :reps="rout.reps" :secs="rout.secs" />
        </div>
      </div>
      <div class="finalSection">
        <button class="startRoutine">Iniciar Rutina</button>
        <div class="share">
          <h2 class="shareTitle">Compartir Rutina</h2>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import RoutineBlock from "@/components/RoutineBlock";

export default {
  name: "RoutineView",
  components: { RoutineBlock, Title, Footer, NavBar},
  data() {return {
    routineName: "Rutina",
    description: "Mi rutina para entrenar brazos",
    warmUp: [{name: "Salto con Soga",
      reps: 10,
      secs: 0},{
      name: "Salto con Soga",
      reps: 10,
      secs: 0
    }, {name: "Descanso",
      reps: 10,
      secs: 0}],
    cycle: [{name: "Salto con Soga",
      reps: 10,
      secs: 0},{
      name: "Salto con Soga",
      reps: 10,
      secs: 0
    }, {name: "Descanso",
      reps: 10,
      secs: 0}],
    cooldown: [{name: "Salto con Soga",
      reps: 10,
      secs: 0},{
      name: "Salto con Soga",
      reps: 10,
      secs: 0
    }, {name: "Descanso",
      reps: 10,
      secs: 0}],
  }}
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
  justify-content: space-between;
}
.startRoutine{
  background-color: #77c6a2;
  width: 460px;
  color:white;
  font-size: 36px;
  border: white 3px solid;
  padding: 10px;
  margin-left: 100px;
  border-radius: 30px;
  font-weight: 700;
  box-shadow: 3px 3px 10px #111;
  cursor:pointer;
}

.share{
  width:320px;
}

.shareTitle{
  color:black;
  width:100%;
  font-size:30px;
  text-align: right;
  border-bottom: #030b10 3px solid;
}

</style>