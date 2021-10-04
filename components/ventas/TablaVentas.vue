<template>
  <v-data-table
    :headers="headers"
    :items="sales"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="success"
        dark
        outlined
        class="ma-0"
        @click="checkDetails(item)"
      >
        VER DETALLE
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TablaVentas",
  data(){
    return{
      headers:[
        {
          text: "Fecha de venta",
          value: "saleDate",
          sortable: false,
          width: "500px",
        },
        {
          text: "Ganancia total (S/.)",
          value: "saleTotal"
        },
        {
          text: "Ganancia proyectada (S/.)",
          value: "theoreticalTotal"
        },
        {
          text: "Ver detalle",
          value: "actions",
          sortable: false, align: "center"
        },
      ],
    }
  },

  computed:{
    ...mapState({
      sales: state => state.ventas.sales.sales,
    }),
  },
  methods:{
    checkDetails(item){
      this.$router.push('ventas/detalle/'+item.saleId);
    },
  }
}
</script>

<style scoped>

</style>
