<template>
  <v-app>
    <v-row>
      <v-col cols="6" class="pa-0">
        <v-img
          :src = "require(`@/static/rice-background.jpg`)"
          width="100%"
          height="100%"
        >
        </v-img>
      </v-col>
      <resetear-credenciales v-show="status" @event-reset-password="handlerReset"/>
      <resetear-correcto v-show="!status" :messageLog="mailMessage"/>
    </v-row>
  </v-app>
</template>

<script>
import ResetearCredenciales from "@/components/login/ResetearCredenciales";
import ResetearCorrecto from "@/components/login/ResetearCorrecto";

export default {
  name: "forgotPassword",
  components:{
    'resetear-credenciales':ResetearCredenciales,
    'resetear-correcto':ResetearCorrecto,
  },
  async created(){
    this.status = true;
  },
  data(){
    return{
      status: true,
      mailMessage: 'Se envió el correo para restablecer su contraseña',
    }
  },

  methods:{
    handlerReset(){
      this.status = false;
    },
  }
}
</script>

<style scoped>

</style>
