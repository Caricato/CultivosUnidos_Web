<template>
  <v-container>
    <v-row >
      <v-col align="center" class="mt-2">
        <span>MES DE LA VENTA: {{month}}</span>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ProyeccionProduccion",

  async mounted(){
    console.log(this.projectCrops);
  },

  computed:{
    ...mapState({
      projectCrops: state => state.proyecciones.projections.projectCrops,
    }),
  },
}
</script>

<style scoped>

</style>
