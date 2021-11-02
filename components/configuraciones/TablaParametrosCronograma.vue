<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor">
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="green lighten-2"
        dark
        outlined
        class="ma-0"
        @click="editParameter(item)"
      >
        EDITAR
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TablaParametrosCronograma",
  data(){
    return{
      headers:[
        {
          text: "Parametro de configuración",
          value: "key",
          sortable: false,
        },
        {
          text: "Valor del parametro",
          value: "value",
          sortable: false,
        },
        {
          text: "Acciones",
          value:"actions",
          align: "center",
          sortable: false,
        }
      ],
    }
  },
  props:{
    items:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default:false,
    },
  },

  methods:{
    editParameter(item){
      console.log(item);
      this.$emit('event-edit-parameter', item);
    },
  },
}
</script>

<style scoped>

</style>
