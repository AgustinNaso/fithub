<template>
  <div :class="{routineBg:true, green:isMine, purple:purple,grey:!isPublic}">
    <div class="routineHead">
      <div class="title">
        <img v-show="isMine && !isPublic" src="../assets/lock_white.svg" alt="priv"/>
        <h3>{{title}}</h3>
      </div>
      <div class="interaction">
        <img v-show="isMine && isFaved" @click="changeFavedState" class="buttonUpper" src="../assets/favorite.svg" alt="unfav"/>
        <img v-show="isMine && !isFaved" @click="changeFavedState" class="buttonUpper" src="../assets/favorite_border.svg" alt="fav"/>
      </div>
    </div>
    <p class="description">{{description}}</p>
    <div class="ownerContainer">
      <img class="ownerImg" :src="ownerImg" :alt="owner"/>
      <p class="owner">{{owner}}</p>
    </div>
    <div class="playContainer">
      <p>{{difficultyToSpanish(difficulty)}}</p>
      <router-link :to="{ name: 'routine', params: {id: this.id } }">
        <div class="playBtn">
          <div class="triangle"/>
        </div>
      </router-link>
    </div>
    <div class="routineEnd">
      <div class="ratingWrap">
        <img v-for="n in 5" class="star" :key="n" :src="decideImg(n)" alt="star">
      </div>
      <div v-show="isMine" class="editing">
        <div class="iconFlex" @click="$emit('deleteRoutine',id)" >
          <img class="trash" src="../assets/basuraicon.png" alt="delete"/>
          <p class="delete">Eliminar</p>
        </div>
        <router-link :to="{ name: 'editRoutine', params: {id: id } }">
        <div class="iconFlex">
          <img class="edit" src="../assets/editicon.png" alt="edit"/>
          <p>Editar</p>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {FavouritesApi} from "@/backend/favourites";
import {difficultyToSpanish} from "@/backend/utils";

export default {
  name: "Routine",
  props:{
    title:String,
    description:String,
    owner: String,
    ownerImg:String,
    rating:Number,
    routineImg:String,
    isMine:Boolean,
    difficulty:String,
    id:Number,
    isPublic:Boolean,
    purple:Boolean,
  },
  data(){
    return{
      isFaved:false
    }
  },
  async created() {
    if (this.isMine){
      const data = await FavouritesApi.getFavourites();
      data.content.forEach(element =>{
        if (element.id === this.id)
          this.isFaved = true;
      })
    }
  },
  methods:{
    changeFavedState(){
      if (!this.isFaved){
        FavouritesApi.setFavourite(this.id);
        this.isFaved = true;
      }else{
        FavouritesApi.deleteFavourite(this.id);
        this.isFaved = false;
        this.$emit('unfav',this.id);
      }
    },
    difficultyToSpanish(difficulty){
      return difficultyToSpanish(difficulty);
    },
    decideImg(i){
      if (i <= this.rating){
        return require("../assets/Video_Star.png");
      }
      return  require("../assets/empty-star.png");
    },
  },

}
</script>

<style scoped>
.routineBg{
  background: rgb(160,128,224);
  background: linear-gradient(180deg, rgba(224,138,128,1) 0%, rgba(183,178,106,1) 100%);
  height: 460px;
  width: 420px;
  border-radius: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
h3{
  flex: 1;
  text-align: left;
  font-size: 31px;
  color: white;
  text-shadow: #030b10 3px 2px 7px;
  word-wrap: break-word;
  width: 80%;
}

.title{
  display: flex;
  width: 80%;
}
.interaction{
  display: flex;
}

.description{
  margin: 20px 0 0 0;
  padding-bottom: 8px;
  text-align: left;
  width: 84%;
  font-size: 20px;
  color: white;
  text-shadow: #030303 3px 2px 7px;
  border-bottom: white solid 3px;
  word-wrap: break-word;
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
  padding-left: 80px;
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
  cursor: pointer;
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

.buttonUpper{
  margin-left: 12px;
  width: 40px;
  cursor: pointer;
}

.playContainer{
  color:white;
  font-size:24px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items:center;
  margin-top:20px
}

.green{
  background: linear-gradient(180deg, rgba(72,169,128,1) 0%, rgba(101,230,176,1) 100%);
}

.purple{
  background: linear-gradient(rgba(160,128,224,1) 0%, rgba(106,124,176,1) 100%);
}

.grey{
  background: rgb(207,198,177);
  background: linear-gradient(rgb(199, 193, 178) 0%, rgb(165, 160, 148) 100%);
}

.editing{
  color:black;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-weight: 700;
  font-size: 19px;
  opacity: 95%;
  margin-top:18px

}
.routineEnd{
  margin-top:auto;
  margin-bottom:30px;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.delete{
  cursor: pointer;
  color: black;
}

a{
  color: black;
  text-decoration: none;
}

.trash{
  height: 28px;
  width: 28px;
  cursor: pointer;
}

.edit{
  height: 28px;
  width: 28px;
  cursor: pointer;
}

.iconFlex{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>