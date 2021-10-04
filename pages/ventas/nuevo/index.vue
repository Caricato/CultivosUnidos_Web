<template>
  <v-container>
    <page-title>
      NUEVO RESULTADO DE VENTA
    </page-title>
    <nueva-venta/>
  </v-container>
</template>

<script>
import NuevaVenta from "@/components/ventas/nuevo/NuevaVenta";

export default {
  name: "index",
  components:{
    "nueva-venta":NuevaVenta
  }
}
</script>

<style scoped>

</style>
