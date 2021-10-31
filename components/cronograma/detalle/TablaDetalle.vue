<template>
  <v-data-table
    :headers="headers"
    :items="details"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="green lighten-2"
        class="ma-0 white--text"
        @click="freeHectares(item)"
        v-if="!item.isFreeHectares"
      >
        LIBERAR HECTAREAS
      </v-btn>
      <v-btn
        color="green lighten-2"
        depressed
        disabled
        class="ma-0 white--text"
        v-else
      >
        LIBERADO
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TablaDetalle",
  props:{
    details:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default: false,
    },
  },
  data(){
    return{
      headers: [
        {
          text: "Productor agricola",
          value: "producerName",
          sortable: false,
          width: "500px",
        },
        {
          text: "DNI",
          value: "producerDNI",
          align: "center"
        },
        {
          text:"Hectareas ocupadas",
          value:"producerHectares",
          align: "center"
        },
        {
          text:"¿Liberar hectáreas?",
          value:"actions",
          align: "center"
        }
      ],
    }
  },
  methods:{
    async freeHectares(item){
      this.$emit('event-free-hectares',item.scheduleDetailId);
    }
  },
}
</script>

<style scoped>

</style>
