<template>
  <v-container>
    <page-title>
      DETALLE DE ENTRADA DE PRODUCTOS
    </page-title>
    <detalle-entrada-producto/>
  </v-container>
</template>

<script>
import DetalleEntrada from "@/components/entradasProducto/detalle/DetalleEntrada";

export default {
  name: "DetalleId",
  components:{
    "detalle-entrada-producto":DetalleEntrada
  }
}
</script>

<style scoped>

</style>
