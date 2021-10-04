<template>
  <v-container>
    <page-title>
      HISTÓRICO DE VENTAS
    </page-title>
    <ventas/>
  </v-container>
</template>

<script>
import Ventas from "@/components/ventas/Ventas";

export default {
  name: "index",
  components:{
    "ventas":Ventas
  }
}
</script>

<style scoped>

</style>
