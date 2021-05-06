<template>
  <div class="cycleContainer">
    <h2 class="sectionTitle" style="color: #42b983"> Ciclo de Ejercitación {{nroDeCiclo + 1}}</h2>
    <button @click="addExcercise()">Agg ejercicio</button>
    <button @click="removeExcercise()">Rem ejercicio</button>

    <div class="routineBlockDiv">
      <div v-for="excercise in excercises" :key="excercise">
        <span><EditableRoutineBlock green/></span>
      </div>
    </div>
  </div>
</template>

<script>

import EditableRoutineBlock from "./EditableRoutineBlock";
export default {
  name: "EditableRoutineCycle",
  components: {EditableRoutineBlock},
  props: {
    nroDeCiclo: String,
  },
  data() {
    return {
      excercises: [],
    }
  },
  methods: {
    addExcercise() {
      this.excercises.push({nombre: "Flexiones", reps: 10, secs: 30});
    },
    removeExcercise() {
      this.excercises.pop();
    }
  }
}
</script>

<style scoped>

.cycleContainer{
  margin-left:60px;

}
.routineBlockDiv{
  margin-top:20px;
  margin-bottom: 30px;
  display:flex;
  flex-wrap:wrap;
  align-items: center;
  border: 2px solid black;

}
</style>