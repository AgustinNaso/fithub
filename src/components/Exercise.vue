<template>
  <div :class="{exerciseBox:true, green:isActivity, blue:isRest}">
    <div class="textContainer">
      <h3>{{title}}</h3>
      <p class="description">{{description}}</p>
    </div>
    <div class="buttonContainer">
      <img class="edit" src="../assets/editicon.png" alt="editicon"/>
      <img class="trash" src="../assets/basuraicon.png" alt="trashicon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exercise",
  props:{
    title:String,
    description:String,
    isActivity:Boolean,
    isRest:Boolean
  }
}
</script>

<style scoped>
.exerciseBox{
  height: 100px;
  width: 90%;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.green{
  background: rgb(65,214,152);
  background: linear-gradient(rgba(65,214,152,1) 0%, rgba(54,158,115,1) 100%);
}

.blue{
  background: rgb(133,158,255);
  background: linear-gradient( rgba(133,158,255,1) 0%, rgba(78,100,188,1) 100%);
}

.textContainer{
  display: flex;
  flex-direction: column;
  width: 85%;
}

h3{
  width: 800px;
  flex: 1;
  text-align: left;
  margin-left: 25px;
  font-size: 25px;
  color: white;
  text-shadow: #030b10 3px 2px 7px;
}

.description{
  padding-bottom: 8px;
  text-align: left;
  width: 84%;
  font-size: 15px;
  color: white;
  text-shadow: #030303 3px 2px 7px;
  word-wrap: break-word;
  margin-left: 25px;
}

.buttonContainer{
  display: flex;
  width: 150px;
}

.edit{
  height: 65px;
  cursor: pointer;
}

.trash{
  height: 65px;
  cursor: pointer;
}
</style>