<template>
  <v-container>
    <page-title>
      PROYECCION POR GANANCIA DESEADA
    </page-title>
    <proyeccion-ganancia/>
  </v-container>
</template>

<script>
import ProyeccionGanancia from "@/components/proyecciones/ganancia/ProyeccionGanancia";

export default {
  name: "index",
  components:{
    'proyeccion-ganancia':ProyeccionGanancia
  }
}
</script>

<style scoped>

</style>
