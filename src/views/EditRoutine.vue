<template>
  <div class="generalContainer">
    <NavBar logged-in/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <EditableTitle to="/myroutines" v-model="routineName" :model-value="routineName"/>
          <textarea class="subtitle" v-model="description" maxlength="100"></textarea>
        </div>
        <div class="dataDiv">
          <div class="difficulty">
            Dificultad:
            <select class="difficultyInput" v-model="difficulty">
              <option disabled value="" >Seleccione una dificultad</option>
              <option value="rookie">Novato</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
              <option value="expert">Experto</option>
            </select>
          </div>
          <div class="visibility">
            Visibilidad:
            <select class="difficultyInput" v-model="isPublic">
              <option disabled value="" >Seleccione la visibilidad</option>
              <option :value="true">Pública</option>
              <option :value="false">Privada</option>
            </select>
          </div>
          <div class="newExDiv">
            <p class="newExTag">¿Te olvidaste de algún ejercicio?</p>
            <router-link :to="{ name: 'createExercise', params: {returnAdd: `editRoutine/${this.$route.params.id}` } }"><button class="createEx">Crear Ejercicio</button></router-link>
          </div>
        </div>
      </div>

      <div class="mainSection">
        <SectionTitle v-if="warmUp.name" :name="warmUp.name" :reps="warmUp.repetitions" style="color: #b88625" @editCycle="editCycle(warmUp,$event)"/>
        <div class="routineBlockDiv">
          <EditableRoutineBlock v-for="(el) in warmUp.exercises" :key="`${el.order}`" orange
                                :exercise="el.exercise" :reps="el.repetitions" :secs="el.duration" :order="el.order"
                                :exercises="warmUp.validExercises" :isCreating="el.isCreating" :isEditing="el.isEditing"
                                :cycle-id="warmUp.id"
                                @removeExercise="removeExercise(warmUp,$event)"
                                @confirmExercise="confirmExercise(warmUp,$event)"
                                @editing="warmUp.editCount++"
                                @release="warmUp.editCount--"
                                @setId="el.exercise.id = $event"/>

          <img v-show="warmUp.validExercises && warmUp.validExercises.length > 0 && warmUp.editCount === 0" class="addButton" src="../assets/add-button-yellow.png"  @click="addExercise(warmUp)" alt=""/>
        </div>

        <div v-for="(cycle,index) in cycles" :key="cycle.id">
          <div class="cycleContainer">
            <div class="cycleHeader">
              <SectionTitle :name="cycle.name" :reps="cycle.repetitions" style="color: #399c70" @editCycle="editCycle(cycle,$event)"/>
              <button class="removeCycleButton" @click="removeCycle(cycle.id)">Remover Ciclo</button>
            </div>
            <div class="routineBlockDiv" v-show="cycle.validExercises">
              <EditableRoutineBlock v-for="(el) in cycles[index].exercises" :key="`${el.order}`" green
                                    :exercise="el.exercise" :reps="el.repetitions" :secs="el.duration" :order="el.order"
                                    :exercises="cycle.validExercises"  :isCreating="el.isCreating" :isEditing="el.isEditing"
                                    :cycle-id="cycle.id"
                                    @removeExercise="removeExercise(cycle,$event)"
                                    @confirmExercise="confirmExercise(cycle,$event)"
                                    @editing="cycle.editCount++"
                                    @release="cycle.editCount--"
                                    @setId="el.exercise.id = $event"/>
              <img v-show="cycle.validExercises && cycle.validExercises.length > 0 && cycle.editCount === 0" class="addButton" src="../assets/add-button-green.png" @click="addExercise(cycles[index])"  alt=""/>
            </div>
          </div>
        </div>
        <button class="cycleButton" @click="addCycle()">+ Agregar Ciclo</button>

        <SectionTitle v-if="cooldown.name" :name="cooldown.name" :reps="cooldown.repetitions" style="color: rgba(78,100,188,0.8)" @editCycle="editCycle(cooldown,$event)"/>
        <div class="routineBlockDiv">
          <EditableRoutineBlock v-for="(el) in cooldown.exercises" :key="`${el.order}`" blue
                                :exercise="el.exercise" :reps="el.repetitions" :secs="el.duration" :order="el.order"
                                :exercises="cooldown.validExercises"  :isCreating="el.isCreating" :isEditing="el.isEditing"
                                :cycle-id="cooldown.id"
                                @removeExercise="removeExercise(cooldown,$event)"
                                @confirmExercise="confirmExercise(cooldown,$event)"
                                @editing="cooldown.editCount++"
                                @release="cooldown.editCount--"
                                @setId="el.exercise.id = $event"/>
          <img v-show="cooldown.validExercises && cooldown.validExercises.length > 0 && cooldown.editCount === 0" class="addButton" src="../assets/add-button-blue.png" @click="addExercise(cooldown)" alt=""/>
        </div>
      </div>

      <div class="finalSection">
        <button class="acceptBtn" @click="confirmChanges"> Registrar Cambios</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import UserStore from "@/stores/UserStore";
import router from "../routes";
import { ExerciseApi} from "@/backend/exercises";
import {Cycle, RoutineApi, RoutineBase} from "@/backend/routines";
import {CycleApi} from "@/backend/cycles";
import EditableTitle from "@/components/editableComponent/EditableTitle";
import EditableRoutineBlock from "@/components/editableComponent/EditableRoutineBlock";
import SectionTitle from "@/SectionTitle";

export default {
  name: "EditRoutine",
  components: {SectionTitle, EditableRoutineBlock, EditableTitle, Footer, NavBar},
  data() {
    return {
      store: UserStore,
      routineName: "",
      description: "",
      difficulty:"",
      isPublic:true,
      warmUp: {},
      cooldown: {},
      cycles: [],
      exercises: [],
      cycleIdx: 0,
    }
  },
  methods: {
    async addCycle() {
      const cycle = new Cycle("Ciclo de Ejercitación",'exercise',this.getMaxOrder()+1,1);
      try {
        const newCycle = await RoutineApi.addCycle(this.$route.params.id, cycle)
        newCycle.exercises = [];
        newCycle.validExercises = [...this.exercises];
        newCycle.editCount = 0;
        this.cycles.push(newCycle);
        this.cycleIdx++;
      }
      catch (e) {
        alert(e);
      }
    },
    addExercise(cycle) {
      cycle.exercises.push({isCreating:true,isEditing:true,order:this.getMaxOrderFromCycle(cycle)+1 , repetitions: 0, duration: 0,exercises:cycle.validExercises,
        exercise:{id:this.getDateTime()}});
    },
    async confirmExercise(cycle,data){
      try{
        if (data.isCreating){
          await CycleApi.addCycleExercise(cycle.id,data.id,data.exToSend);
          cycle.validExercises.splice(cycle.validExercises.findIndex(a => a.id === data.id), 1)
        }else{
          await CycleApi.removeCycleExercise(cycle.id,data.prevEx.id);
          await CycleApi.addCycleExercise(cycle.id,data.id,data.exToSend);
          cycle.validExercises.push(data.prevEx);
          cycle.validExercises.splice(cycle.validExercises.findIndex(a => a.id === data.id), 1);
        }
      }catch (e) {
        console.log(e);
      }
    },
    getMaxOrderFromCycle(cycle){
      let maxOrder = 1;
      cycle.exercises.forEach((ex) => maxOrder = ex.order>maxOrder?ex.order:maxOrder);
      return maxOrder
    },
    async removeExercise(cycle,ex) {
          try{
            await CycleApi.removeCycleExercise(cycle.id,ex.id);
            cycle.validExercises.push(ex);
          }catch(e){
            console.log(e);
          }
          console.log(cycle.exercises);
          console.log(ex);
          cycle.exercises.splice(cycle.exercises.findIndex(a => a.exercise.id === ex.id), 1)
    },
    async removeCycle(id){
      try{
        await RoutineApi.deleteCycle(this.$route.params.id,id);
        this.cycles.splice(this.cycles.findIndex(cycle => cycle.id === id), 1);
      }
      catch (e) {
        alert(e);
      }
    },
    async editCycle(cycle,data){
      const toSend = new Cycle(data.name,cycle.type,cycle.order,data.repetitions);
      try{
        await RoutineApi.editCycle(this.$route.params.id,cycle.id,toSend);
      }catch (e){
        console.log(e);
      }
    },
    getDateTime() {
      return new  Date().getTime();
    },
    getMaxOrder(){
      let maxOrder = 3;
      this.cycles.forEach((cycle) => maxOrder = cycle.order>maxOrder?cycle.order:maxOrder);
      return maxOrder
    },
    async confirmChanges(){
      try{
        const routineState = new RoutineBase(this.routineName, this.description,this.isPublic, this.difficulty);
        await RoutineApi.editRoutine(this.$route.params.id,routineState);
      }catch (e) {
        await router.push('/error');
      }

      await router.push(`/routine/${this.$route.params.id}`);
    },

  },
  async created() {
    if (!this.store.isLoggedIn()) {
      await router.push("/permissionDenied");
    }
    try {
      const data = await ExerciseApi.getExercises();
      this.exercises = data.content;

      const routine = await RoutineApi.getRoutineById(this.$route.params.id);
      this.routineName = routine.name;
      this.description = routine.detail;
      this.difficulty = routine.difficulty;
      this.isPublic = routine.isPublic;

      const cycles = await RoutineApi.getCycles(this.$route.params.id);
      for (const cycle of cycles.content) {
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        cycle.exercises = exerciseObj.content;
        cycle.validExercises = [...this.exercises];
        cycle.validExercises = cycle.validExercises.filter(a => !cycle.exercises.map(b=>b.exercise.id).includes(a.id));
        cycle.editCount = 0;
        switch (cycle.type){
          case 'warmup': this.warmUp = cycle; break;
          case 'cooldown': this.cooldown = cycle;break;
          case 'exercise': this.cycles.push(cycle);break;
        }
      }

    }catch (e) {
      await router.push("/error");
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
  color: #399c70;
  flex-direction: column;
}

.subtitle{
  font-size: 24px;
  color: #606360;
  margin-left:50px;
  resize: none;
  width: 500px;
  height: 120px;
  border: solid 3px #399c70;
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
  width: 60%;
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
  display: flex;
  flex-direction: column;
}

.finalSection{
  padding-top:60px;
  display:flex;
  border-top: #aeb3b1 3px dotted ;
  justify-content: space-evenly;

}
.cycleButton,.acceptBtn{
  align-self: center;
  color: #35a371;
  text-align: center;
  background-color: inherit;
  border: 4px solid #399c70;
  border-radius: 25px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.cycleButton{
  width: 700px;
  font-size: 30px;
  padding: 8px 0 8px 0;
  margin-right: 10px;
  margin-bottom: 50px;
  color:#399c70;
}

.acceptBtn{
  width: 500px;
  padding: 12px;
  font-size: 40px;
  cursor: pointer;
  color: #399c70;
  background-color: inherit;
  border-color: #399c70 ;
  transition: 0.3s ease-in-out;
}



.addButton {
  height: 150px;
  margin-bottom: 25px;
  cursor: pointer;
}

.removeCycleButton{
  border: 4px solid #d01212;
  background: transparent;
  border-radius: 25px;
  font-weight: 700;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}

.removeCycleButton{
  font-size: 20px;
  background-color: inherit;
  margin: 1px 0 0 15px;
  border-radius: 50px;
  border-width: medium;
  padding: 2px 5px 2px 5px;
  height: 40px;
}
.removeCycleButton:hover{
  background-color: #f7a6a6;
  transition: 0.3s ease-in-out;
  color: #950707;
}

.acceptBtn:hover,.cycleButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.cycleHeader{
  display: flex;
  align-items: center;
}

.difficultyInput{
  margin-right: 30px;
  width: 160px;
  font-size: 20px;
  margin-left: 10px;
  padding:4px;
  border-radius: 10px;
  border: #31ae7a 2px solid;
}

.visibility{
  margin-top: 10px;
}

.newExDiv{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 25px;
  height: 120px;
  background-color: white;
  padding: 8px;
  border-radius: 12px;
  border: #399c70 3px solid;
}

.newExTag{
  color: #399c70;
}

.createEx{
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

.createEx:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

@media (max-width: 1200px) {
  .routineIntro{
    flex-direction: column;
    align-items: flex-start;
  }

  .dataDiv{
    margin-left: 60px;
  }



}

</style>