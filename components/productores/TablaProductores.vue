<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor"
    :search="search"
  >
  </v-data-table>
</template>

<script>
export default {
  name: "TablaProductores",
  props:{
    items:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default:false
    },
    search:{
      type:String,
      default: '',
    }
  },
  data(){
    return{
      headers: [
        {
          text: "Apellidos y Nombres",
          value: "fullName",
          sortable: false,
          width: "500px",
        },
        {
          text: "DNI",
          value: "cantForHectare"
        },
        {
          text: "Correo electrónico",
          value: "supplyMetricType",
          align: "center"
        },
        {
          text: "Dirección",
          value: "supplyMetricType",
          align: "center"
        },
        {
          text: "Hectáreas",
          value: "supplyMetricType",
          align: "center"
        },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    }
  }
}
</script>

<style scoped>

</style>
