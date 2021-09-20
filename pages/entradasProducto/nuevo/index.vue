<template>
  <v-container>
    <page-title>
      NUEVA ENTRADA DE PRODUCTOS
    </page-title>
    <nueva-entrada-producto/>
  </v-container>
</template>

<script>
import NuevaEntradaProducto from "@/components/entradasProducto/nuevo/NuevaEntradaProducto";

export default {
  name: "index",
  components:{
    "nueva-entrada-producto":NuevaEntradaProducto,
  }
}
</script>

<style scoped>

</style>
