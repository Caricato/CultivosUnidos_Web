<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    loading-text="Cargando... Espere por favor"
    :items-per-page="5"
  >
  </v-data-table>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TablaDetalle",
  data(){
    return{
      headers: [
        {
          text: "Producto",
          value: "productName",
          sortable: false,
          width: "500px",
        },
        {
          text: "Sacos vendidos",
          value: "soldSacks",
          align: "center"
        },
        {
          text:"Total de la venta del producto",
          value:"subtotal",
          align: "center"
        }
      ],
    }
  },
  props:{
    items:{
      type: Array,
      default: [],
    },
    loading:{
      type:Boolean,
      default:false
    },
  },
}
</script>

<style scoped>

</style>
