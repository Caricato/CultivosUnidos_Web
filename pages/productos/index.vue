<template>
  <v-container>
    <page-title>
      PRODUCTOS
    </page-title>
    <productos/>
  </v-container>
</template>

<script>
import Productos from "@/components/productos/Productos";

export default {
  name: "index",
  components:{
    "productos":Productos,
  },
}
</script>

<style scoped>

</style>
