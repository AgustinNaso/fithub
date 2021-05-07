<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <Title :title-name="routineName" to="/routine"/>
      <div class="executionContainer">
        <div class="btnContainer">
          <img class="arrowBtn" src="../assets/arrowLeft.png" alt="arrowLeft">
          <img class="pauseBtn" src="../assets/pauseIcon.png" alt="pauseIcon">
          <img class="arrowBtn" src="../assets/arrowRight.png" alt="arrowRight">
        </div>
        <ExerciseExecution
            cooldown
            seconds
            title="Salto con Soga"
            duration="10"
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
import ExerciseExecution from "../components/ExerciseExecution";
export default {
  name: "RoutineExecution",
  components: {ExerciseExecution, Title, Footer, NavBar},
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
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.btnContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 400px;
}

.arrowBtn{
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
}
.pauseBtn {
  height: 125px;
  width: 150px;
  margin-bottom: 5px;
}
</style>