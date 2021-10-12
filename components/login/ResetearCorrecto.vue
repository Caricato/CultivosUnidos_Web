<template>
  <v-col cols="6" class="pa-0">
    <v-row align="center" justify="center">
      <v-img class="mt-12"
             :src = "require(`@/static/check-logo.jpg`)"
             contain
             height="270px"
             width="250px"
      >
      </v-img>
    </v-row>
    <v-row align="center" justify="center">
      <span class="mt-3 text-h6"> {{messageLog}}</span>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn color="green lighten-2" class="white--text mt-16" @click="returnLogin">
        VOLVER A INICIO DE SESIÓN
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "ResetearCorrecto",
  methods:{
    returnLogin(){
      this.$router.push('/login');
    }
  },
  props:{
    messageLog:{
      type:String,
      default:'',
    }
  }
}
</script>

<style scoped>

</style>
