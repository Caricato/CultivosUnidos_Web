<template>
  <v-container>
    <page-title>
      HISTÓRICO DE VENTAS
    </page-title>
    <estadisticas/>
  </v-container>
</template>

<script>
import Estadisticas from "@/components/estadisticas/Estadisticas";

export default {
  name: "index",
  components:{
    'estadisticas':Estadisticas
  },
}
</script>

<style scoped>

</style>
