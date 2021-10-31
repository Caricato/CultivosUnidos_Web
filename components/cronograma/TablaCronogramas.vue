<template>
  <v-data-table
    :headers="headers"
    :items="schedules"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor"
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
export default {
  name: "TablaCronogramas",
  data(){
    return{
      headers:[
        {
          text: "Fecha inicio",
          value: "startDate",
        },
        {
          text: "Fecha fin",
          value: "endDate",
        },
        {
          text: "Producto",
          value: "productName",
          align: "center"
        },
        {
          text: "Estado",
          value: "state",
          align: "center"
        },
        {
          text: "Ver detalle",
          value: "actions",
          sortable: false, align: "center"
        },
      ],
    }
  },
  props:{
    schedules:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default: false,
    },
  },
  methods:{
    checkDetails(item){
      this.$router.push(`cronogramas/detalle/${item.scheduleId}`);
    }
  }
}
</script>

<style scoped>

</style>
