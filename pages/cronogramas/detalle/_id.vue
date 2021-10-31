<template>
  <v-container>
    <page-title>
      DETALLE DE CRONOGRAMA
    </page-title>
    <detalle-cronograma/>
  </v-container>

</template>

<script>
import DetalleCronograma from "@/components/cronograma/detalle/DetalleCronograma";

export default {
  name: "DetalleCronogramaId",
  components:{
    "detalle-cronograma":DetalleCronograma
  }
}
</script>

<style scoped>

</style>
