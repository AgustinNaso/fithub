<template>
  <div class="routineBg">
    <div class="routineHead">
      <h3>{{title}}</h3>
      <img class="shareBtn" src="../assets/Sgare-White-Icon-PNG.png" alt="share"/>
    </div>
    <p class="description">{{description}}</p>
    <div class="ownerContainer">
      <img class="ownerImg" :src="ownerImg" :alt="owner"/>
      <p class="owner">{{owner}}</p>
    </div>
    <div class="playBtn">
      <div class="triangle"/>
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
  width: 80%;
  flex: 1;
  text-align: left;
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
  object-fit:cover;
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
  width: 40px;
  filter: drop-shadow(0.1rem 0.2rem 0.25rem rgba(0, 0, 0, 0.5));
}
.ratingWrap{
  display: flex;
  justify-content: space-evenly;
  width: 45%;
}
.playBtn{
  border-radius: 50%;
  height: 65px;
  width: 65px;
  background-color: rgba(255, 255, 255, 0.50);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid white;
}
.triangle{
  width: 0;
  height: 0;
  margin-left: 10px;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 32px solid rgba(255, 255, 255, 0.80);
}

.routineHead{
  margin: 24px 30px 0 20px;
  display: flex;
  width: 85%;
  justify-content: space-between;
  align-items: flex-start;
}

.shareBtn{
  margin-left: 12px;
  width: 50px;

}
</style>