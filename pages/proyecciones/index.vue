<template>
  <v-container>
    <page-title>
      PROYECCIONES
    </page-title>
    <proyecciones/>
  </v-container>
</template>

<script>
import Proyecciones from "@/components/proyecciones/Proyecciones";

export default {
  name: "index",
  components:{
    "proyecciones":Proyecciones
  }
}
</script>

<style scoped>

</style>
