<template>
  <v-data-table
    :headers="headers"
    :items="supplies"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor"
    :search="search"
  >

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
import {mapState} from "vuex";

export default {
  name: "TablaInsumos",
  data: () =>({
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        filterable: true,
        sortable: true,
        value: 'supplyName',
      },
      { text: 'Cantidad', value: 'stock' , filterable: false},
      { text: 'Unidad métrica', value: 'supplyMetricType', filterable:false },
      { text: 'Precio Unitario (S/.)', value: 'unitPricing', filterable:false },
      { text: 'Cantidad mínima', value: 'stockMin', filterable:false, sortable: false },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    defaultItem: {
      supplyName: '',
      stock: 0,
      supplyMetricType: 0,
      unitPricing: 0,
      stockMin: 0,
    },
    editedItem: {
      supplyName: '',
      stock: 0,
      supplyMetricType: 0,
      unitPricing: 0,
      stockMin: 0,
    },
    dialog: false,
    dialogDelete: false,
    dialogSuccess: false,
    messageSuccess: '',
    editedIndex: -1,
  }),
  methods:{
    editItem (item) {
      this.editedIndex = this.supplies.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.$emit('event-delete-pending', item);
    },
    handleEvent2(input){
      this.dialogDelete = input
    },
    handleEvent3(input){
      this.dialog = input
    },
    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
    handleSuccess(input){
      this.dialogSuccess = input
    }
  },

  props:{
    supplies:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default: false,
    },
    search:{
      type:String,
      default: '',
    }
  },
}
</script>

<style scoped>

</style>
