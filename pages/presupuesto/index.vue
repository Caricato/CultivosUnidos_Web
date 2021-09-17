<template>
  <v-container>
    <page-title>
      PRESUPUESTO DE COMPRA
    </page-title>
    <presupuesto/>
  </v-container>
</template>

<script>
import Presupuesto from "@/components/presupuesto/Presupuesto";

export default {
  name: "index",
  components:{
    "presupuesto":Presupuesto,
  }
}
</script>

<style scoped>

</style>
