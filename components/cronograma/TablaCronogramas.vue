<template>
  <v-data-table
    :headers="headers"
  />
</template>

<script>
export default {
  name: "TablaCronogramas",
  data(){
    return{
      headers:[
        {
          text: "Fecha inicio",
          value: "supply.supplyName",
          sortable: false,
          width: "500px",
        },
        {
          text: "Fecha fin",
          value: "entryCant"
        },
        {
          text: "Producto",
          value: "supply.supplyMetricType",
          align: "center"
        },
        {
          text: "Estado",
          value: "supply.supplyMetricType",
          align: "center"
        },
        {
          text: "Ver detalle",
          value: "supply.supplyMetricType",
          align: "center"
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
