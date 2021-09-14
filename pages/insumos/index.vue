<template>
  <v-container>
    <page-title>
      INSUMOS
    </page-title>
    <insumos/>
  </v-container>

</template>

<script>
import Insumos from "~/components/insumos/Insumos";
export default {
  name: "index",
  components: {
    'insumos': Insumos,
  },
}
</script>

<style scoped>

</style>
