<template>
  <v-container>
    <page-title>
      NUEVA ENTRADA DE INSUMOS
    </page-title>
    <nueva-entrada/>
  </v-container>
</template>

<script>

import NuevaEntrada from "@/components/entradas/nuevo/NuevaEntrada";

export default {
  name: "index",
  components: {
    'nueva-entrada': NuevaEntrada,
  },
}
</script>

<style scoped>

</style>
