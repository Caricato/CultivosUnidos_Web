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
      <generar-credenciales v-show="status" @event-reset-password="handlerReset"/>
      <resetear-correcto v-show="!status" :messageLog="resetMessage"/>
    </v-row>
  </v-app>
</template>

<script>
import GenerarCredenciales from "@/components/login/GenerarCredenciales";
import ResetearCorrecto from "@/components/login/ResetearCorrecto";

export default {
  name: "resetPassword",
  data(){
    return{
      status:true,
      resetMessage: 'Su clave se reinició satisfactoriamente',
    }
  },

  methods:{
    handlerReset(){
      this.status = false;
    },
  },

  async created(){
    this.status = true;
  },
  components:{
    "generar-credenciales":GenerarCredenciales,
    'resetear-correcto':ResetearCorrecto,
  }
}
</script>

<style scoped>

</style>
