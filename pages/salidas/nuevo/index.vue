<template>
  <v-container>
    <page-title>
      NUEVA SALIDA DE INSUMOS
    </page-title>
    <nueva-salida/>
  </v-container>
</template>

<script>
import NuevaSalida from "@/components/salidas/NuevaSalida";

export default {
  name: "index",
  components:{
    "nueva-salida":NuevaSalida,
  }
}
</script>

<style scoped>

</style>
