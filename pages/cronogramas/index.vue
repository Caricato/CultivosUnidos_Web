<template>
  <v-container>
    <page-title>
      CRONOGRAMAS
    </page-title>
    <cronograma/>
  </v-container>
</template>

<script>
import Cronograma from "@/components/cronograma/Cronograma";

export default {
  name: "index",
  components:{
    "cronograma":Cronograma,
  }
}
</script>

<style scoped>

</style>
