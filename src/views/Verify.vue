<template>
  <div v-show="verified">Cuenta verificada correctamente</div>
</template>

<script>
import router from "@/routes";
import {UserApi,EmailVerifier} from "@/backend/user";

export default {
  name: "Verify",
  data(){
    return{
      verified:false
    }
  },
  async created() {
    try {
      const emailVerif = new EmailVerifier(this.$route.query.email,this.$route.query.code);
      await UserApi.verifyEmail(emailVerif);
    }catch (e){
      router.push("/error")
      return;
    }
    this.verified= true;
  }
}
</script>

<style scoped>

</style>