<template>
  <v-container>
    <page-title>
      NUEVO PRODUCTO
    </page-title>
    <nuevo-producto/>
  </v-container>
</template>

<script>

import NuevoProducto from "@/components/productos/nuevo/NuevoProducto";

export default {
  name: "index",
  components:{
    "nuevo-producto":NuevoProducto,
  }
}
</script>

<style scoped>

</style>
