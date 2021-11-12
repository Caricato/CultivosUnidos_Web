<template>
  <v-container>
    <page-title>
      DETALLE DE PRODUCTO
    </page-title>
    <detalle-producto/>
  </v-container>
</template>

<script>
import DetalleProducto from "@/components/productos/detalle/DetalleProducto";

export default {
  name: "DetalleProductoId",
  components:{
    "detalle-producto":DetalleProducto,
  }
}
</script>

<style scoped>

</style>
