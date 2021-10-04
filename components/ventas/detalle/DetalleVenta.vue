<template>
  <v-container>
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
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" align="center">FECHA DE VENTA:</div>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" v-if="this.sale.saleDate !== null">
                  <p>{{formatDateTimeToLocal(this.sale.saleDate)}}</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-detalle :items="items" :loading="loading"/>
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
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" align="center">TOTAL DE LA VENTA:  {{this.sale.saleTotal}} SOLES</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" align="center">TOTAL DE VENTA PROYECTADO:  {{this.sale.theoreticalTotal}} SOLES</div>
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
import {formatDateTimeToLocal} from "@/helpers/format";
import {mapActions, mapState} from "vuex";
import TablaDetalle from "@/components/ventas/detalle/TablaDetalle";

export default {
  name: "DetalleVenta",
  data(){
    return{
      items:[],
    }
  },
  components:{
    'tabla-detalle':TablaDetalle,
  },
  methods:{
    ...mapActions({
      getSaleDetail:'ventas/sales/getSaleDetail',
    }),
    formatDateTimeToLocal,
  },
  computed:{
    ...mapState({
      sale: state => state.ventas.sales.sale,
      detail: state => state.ventas.sales.saleDetail,
      loading: state => state.ventas.sales.loading,
    }),
  },

  async created(){
    await this.getSaleDetail({saleId: this.$route.params.id});
    this.items = this.detail;
  }
}
</script>

<style scoped>

</style>
