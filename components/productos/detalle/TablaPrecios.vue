<template>
  <v-data-table
    :headers="headers"
    :items="prices"
    :items-per-page="5"
  >
  </v-data-table>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TablaPrecios",
  data(){
    return{
      headers: [
        {
          text: 'Mes',
          align: 'start',
          sortable: false,
          value: 'month',
        },
        { text: 'Precio por saco', value: 'unitPricing' , align: 'center', sortable: true},
      ],
      months:[
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SETIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",
      ],
      rows:[],
    }
  },

  computed:{
    ...mapState({
      prices: state => state.productos.products.prices,
    })
  }
}
</script>

<style scoped>
</style>
