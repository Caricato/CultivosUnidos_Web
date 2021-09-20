<template>
  <v-container>
    <page-title>
      ENTRADAS DE PRODUCTOS
    </page-title>
    <entradas-producto/>
  </v-container>
</template>

<script>
import EntradasProducto from "@/components/entradasProducto/EntradasProducto";

export default {
  name: "index",
  components:{
    "entradas-producto":EntradasProducto,
  }
}
</script>

<style scoped>

</style>
