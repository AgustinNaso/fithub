<template>
  <div class="routineBg">
    <h3>Pecho Intenso</h3>
    <p class="description">Una rutina perfecta para trabajar
      el tren superior!</p>
    <div class="ownerContainer">
      <div class="ownerImg" style="background-image:url('https://i.pinimg.com/originals/94/6e/82/946e829a135f68d7a041e3a83b445f55.jpg')"></div>
      <p class="owner">Pedro Gonzalez</p>
    </div>
    <div class="ratingWrap">
      <img v-for="n in rating" class="star" :key="n" src="../assets/Video_Star.png" alt="star">
    </div>
  </div>
</template>

<script>
export default {
  name: "Routine",
  props:{
    title:String,
    description:String,
    owner: String,
    ownerImg:String,
    rating:Number,
    routineImg:String
  }
}
</script>

<style scoped>
.routineBg{
  background: rgb(160,128,224);
  background: linear-gradient(rgba(160,128,224,1) 0%, rgba(106,124,176,1) 100%);
  height: 540px;
  width: 440px;
  border-radius: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
h3{
  margin: 18px 0 0 95px;
  text-align: left;
  width: 100%;
  font-size: 32px;
  color: white;
  text-shadow: #030b10 3px 2px 7px;
}
.description{
  margin: 35px 0 0 0;
  padding-bottom: 8px;
  text-align: left;
  width: 84%;
  font-size: 18px;
  color: white;
  text-shadow: #030303 3px 2px 7px;
  border-bottom: white solid 3px;
}
.owner{
  margin-left: 10px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  text-shadow: #030303 3px 2px 5px;
}
.ownerImg{
  height: 48px;
  width: 48px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid white;
}
.ownerContainer{
  margin-top: 14px;
  padding-left: 110px;
  display: flex;
  align-items: center;
  width: 100%;
}

.star{
  width: 32px;
  filter: drop-shadow(0.1rem 0.2rem 0.25rem rgba(0, 0, 0, 0.5));
}
.ratingWrap{
  display: flex;
  justify-content: space-evenly;
  width: 45%;
}
</style>