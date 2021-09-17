<template>
  <v-container>
    <page-title>
      EDITAR PRODUCTO
    </page-title>
    <editar-producto/>
  </v-container>
</template>

<script>
import EditarProducto from "@/components/productos/editar/EditarProducto";

export default {
  name: "EditarProductoId",
  components:{
    "editar-producto":EditarProducto,
  },
}
</script>

<style scoped>

</style>
