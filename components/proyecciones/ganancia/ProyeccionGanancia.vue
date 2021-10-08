<template>
  <v-container>
    <v-row >
      <v-col align="center" class="mt-2">
        <span>MES DE LA VENTA: {{month}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-proyeccion :items="projectCrops"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" align="center">TOTAL DE GANANCIA PROYECTADA: {{formatNumber(total)}}</div>
              </v-col>
            </v-row><v-row>
            <v-col class="text-center">
              <div class="text-h6 primary-color mr-8 mt-2 mb-0" align="center">TOTAL DE HECTAREAS A CULTIVAR: {{totalCrops}}</div>
            </v-col>
          </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center"
           justify="center">
      <v-btn
        color="success"
        dark
        outlined
        class="ma-0"
        @click="$router.go(-1)"
      >
        ATRAS
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>


import TablaProyeccion from "@/components/proyecciones/produccion/TablaProyeccion";
import {mapActions, mapState} from "vuex";
import {formatNumber} from "@/helpers/format";

export default {
  name: "ProyeccionGanancia",
  components:{
    'tabla-proyeccion':TablaProyeccion
  },

  created(){
    if (this.projectCrops.length === 0 && this.month === ''){
      this.$router.push('/proyecciones');
    }
  },

  async mounted(){
    await this.getProjectEarnings({month:this.month, products: this.products});
  },

  methods:{
    ...mapActions({
      getProjectEarnings:'proyecciones/projections/getProjectEarnings',
    }),

    formatNumber,
  },

  computed:{
    ...mapState({
      month: state => state.proyecciones.projections.month,
      products: state => state.proyecciones.projections.productsData,
      projectCrops: state => state.proyecciones.projections.projectCrops,
      total: state => state.proyecciones.projections.total,
      totalCrops: state => state.proyecciones.projections.totalCrops,
    }),
  }
}
</script>

<style scoped>

</style>
