<template>
  <v-container>
    <page-title>
      DETALLE DE VENTA
    </page-title>
    <detalle-venta/>
  </v-container>
</template>

<script>
import DetalleVenta from "@/components/ventas/detalle/DetalleVenta";

export default {
  name: "VentaId",
  components:{
    'detalle-venta':DetalleVenta,
  }
}
</script>

<style scoped>

</style>
