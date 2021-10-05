<template>
  <v-container>
    <page-title>
      PROYECCION POR CULTIVO
    </page-title>
    <proyeccion/>
  </v-container>
</template>

<script>
import ProyeccionProduccion from "@/components/proyecciones/produccion/ProyeccionProduccion";

export default {
  name: "index",
  components:{
    'proyeccion':ProyeccionProduccion
  },
}
</script>

<style scoped>

</style>
