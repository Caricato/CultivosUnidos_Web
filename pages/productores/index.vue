<template>
  <v-container>
    <page-title>
      PRODUCTORES
    </page-title>
    <productores/>
  </v-container>
</template>

<script>
import Productores  from "@/components/productores/Productores";

export default {
  name: "index",
  components:{
    'productores':Productores,
  }
}
</script>

<style scoped>

</style>
