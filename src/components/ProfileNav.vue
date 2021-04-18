<template>
<div class="profileContainer">
  <img class="userImg" :src="userImg" :alt="userName">
  <p>{{userName}}</p>
  <img class="arrow" src="../assets/chevron_down_green.png" alt="arrow">

</div>
</template>

<script>
export default {
  name: "ProfileNav",
  props:{
    userName: String,
    userImg: String
  }
}
</script>

<style scoped>
.profileContainer{
  display: flex;
  align-items: center;
}
.userImg{
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 16px;
  object-fit:cover;
  border: 3px solid #42b983;
}
p{
  font-size: 22px;
}
.arrow{
  height: 50px;
}
</style>