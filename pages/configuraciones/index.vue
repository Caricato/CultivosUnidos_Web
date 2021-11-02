<template>
  <v-container>
    <page-title>
      CONFIGURACIONES
    </page-title>
    <configuraciones/>
  </v-container>
</template>

<script>
import Configuracion from "@/components/configuraciones/Configuracion";

export default {
  name: "index",
  components:{
    "configuraciones":Configuracion,
  }
}
</script>

<style scoped>

</style>
