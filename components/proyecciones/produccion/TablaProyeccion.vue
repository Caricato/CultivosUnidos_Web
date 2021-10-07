<template>
  <v-data-table :headers="headers" :items="items">
  </v-data-table>
</template>

<script>
export default {
  name: "TablaProyeccion",
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
          text: "Sacos a producir",
          value: "productSacks",
          align: "center"
        },
        {
          text: "Sacos por hectárea",
          value: "relationSacks",
          align: "center"
        },
        {
          text:"Hectáreas a cultivar",
          value:"crops",
          align: "center"
        },
        {
          text:"Precio por saco",
          value:"unitPricing",
          align: "center"
        },
        {
          text:"Subtotal",
          value:"subtotal",
          align: "center"
        },
      ],
    }
  },
  props:{
    items:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>

</style>
