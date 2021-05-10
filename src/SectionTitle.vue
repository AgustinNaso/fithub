<template>
  <div class="cycleHeader">
    <h2 v-show="!isEditing" class="sectionTitle">{{ dataName }} - -  {{dataReps}} set/s</h2>
    <input v-show="isEditing" class="sectionTitle inputTitle" v-model="dataName">
    <input  v-show="isEditing" type="number" class="sectionTitle inputReps" name="reps" v-model.number="dataReps" min="1">
    <h2 class="sets" v-show="isEditing"> sets/s</h2>
    <img v-show="!isEditing" src="@/assets/editicon.png" class="editIcon" alt="edit" @click="handleEdit" >
    <img v-show="isEditing" src="@/assets/tick.png" class="editIcon" alt="edit" @click="handleEdit" >
  </div>
</template>

<script>

export default {
  name: "SectionTitle",
  props:{
    name:String,
    reps:Number
  },
  data(){
    return{
      isEditing:false,
      dataName:"",
      dataReps:0,
    }
  },
  methods:{
    async handleEdit(){
      this.isEditing = !this.isEditing;
      if (!this.isEditing){
        await this.$emit('editCycle', {name:this.dataName,repetitions:this.dataReps});
      }
    }
  },
  created() {
    this.dataName = this.name;
    this.dataReps = this.reps;
  }
}
</script>

<style scoped>
  .cycleHeader{
    display: flex;
    align-items: center;
  }
  .sectionTitle{
    font-size: 28px;
  }

  .editIcon{
    margin: 0 10px 0 20px;
    height: 32px;
    cursor: pointer;
  }

  .inputTitle{
    color: inherit;
    font-weight: 700;
    border: black 3px solid;
    border-color: inherit;
    border-radius: 30px;
    padding: 4px;
  }

  .inputReps{
    width: 50px;
    margin-left: 20px;
    color: inherit;
    border: black 3px solid;
    border-color: inherit;
    border-radius: 5px;
    padding: 4px;
  }
  .sets{
    margin-left: 10px;
  }
</style>