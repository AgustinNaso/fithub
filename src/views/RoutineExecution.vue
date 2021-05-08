<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <Title :title-name="routineName"></Title>
      <div class="executionContainer">
        <div class="exerciseContainer">
          <img class="arrowBtn" src="../assets/arrowLeft.png" alt="arrowLeft">
          <ExerciseExecution
              cycle
              seconds
              title="Salto con Soga"
              duration="10"
          />
          <img class="arrowBtn" src="../assets/arrowRight.png" alt="arrowRight">
        </div>
        <div class="buttonContainer">
          <button type="button" class="pauseButton">Pausar</button>
          <router-link to="/routine"><button type="button" class="finishButton">Terminar</button></router-link>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ExerciseExecution from "../components/ExerciseExecution";
import Title from "../components/Title";
export default {
  name: "RoutineExecution",
  components: {Title, ExerciseExecution, Footer, NavBar},
  data() {
    return {
      routineName: "Rutina"
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
  color: #42b983;
}

.executionContainer{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.exerciseContainer{
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.arrowBtn{
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
  cursor: pointer;
}

.buttonContainer{
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  width: 600px;
}

.pauseButton{
  width: 200px;
  border-radius: 25px;
  padding:10px;
  border: 4px solid #42b983;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #42b983;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}
.pauseButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.pauseButton:active {
  background: transparent;
}

.finishButton{
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

.finishButton:hover{
  background-color: #f7a6a6;
  transition: 0.3s ease-in-out;
  color: #950707;
}

.finishButton:active {
  background: transparent;
}
</style>