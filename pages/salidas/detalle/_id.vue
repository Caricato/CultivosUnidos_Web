<template>
  <v-container>
    <page-title>
      DETALLE DE SALIDA DE INSUMOS
    </page-title>
    <detalle-entrada/>
  </v-container>
</template>

<script>

import DetalleEntrada from "@/components/entradas/detalle/DetalleEntrada";
export default {
  name: "DetalleId",
  components: {
    'detalle-entrada': DetalleEntrada,
  },
}
</script>

<style scoped>

</style>
