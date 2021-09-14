<template>
  <v-container>
    <page-title>
      ENTRADAS DE INSUMOS
    </page-title>
    <entradas/>
  </v-container>
</template>

<script>
import Entradas from "@/components/entradas/Entradas";

export default {
  name: "index",
  components: {
    'entradas': Entradas,
  },
}
</script>

<style scoped>

</style>
