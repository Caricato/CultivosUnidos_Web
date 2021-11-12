<template>
<v-data-table
  :headers="headers"
  :items="items"
  :loading="loading"
  :items-per-page="5"
  loading-text="Cargando... Espere por favor">
  <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-spacer></v-spacer>
        <v-btn
          color="green lighten-2"
          dark
          class="mb-2"
          @click="saveItem"
        >
          AGREGAR UNIDAD MÉTRICA
        </v-btn>
    </v-toolbar>
  </template>
  <template v-slot:item.actions="{ item }">
    <v-icon
      small
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-pencil
    </v-icon>
    <v-icon
      small
      @click="deleteItem(item)"
    >
      mdi-delete
    </v-icon>
  </template>
</v-data-table>
</template>

<script>
export default {
  name: "TablaUnidadesMetricas",
  data(){
    return{
      headers:[
        {
          text: "Unidad Métrica",
          value: "name",
          sortable: true,
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
    saveItem(){
      this.$emit('event-register-unit');
    },
    editItem(item){
      this.$emit('event-edit-unit', item);
    },
    deleteItem(item){
      this.$emit('event-delete-unit', item);
    }
  }
}
</script>

<style scoped>

</style>
