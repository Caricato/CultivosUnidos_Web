<template>
  <v-container>
    <v-row>
      <v-col>
        <search-bar @event-1 = "handleEvent1" :rules="searchRules" :label="labelSearch"/>
      </v-col>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          v-show="optionsForSupervisor === 'SUPERVISOR'"
          @click="saveItem()"
        >
          NUEVO PRODUCTO
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-productos
          :search="search"
          @event-delete-pending="handleDeleteEvent"/>
        <eliminar-producto
          :dialogConfirm='dialogDelete'
          :edited-item='editedItem'
          @event-delete="handleConfirmDeleteEvent"
          @event-action-success="handleActionSuccess"
        />
        <accion-correcta
          :dialog-success= 'dialogSuccess'
          :message = 'messageSuccess'
          @event-success = "handleSuccess"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablaProductos from "@/components/productos/TablaProductos";
import SearchBar from "@/components/SearchBar";
import EliminarProducto from "@/components/productos/EliminarProducto";
import {mapState} from "vuex";

export default {
  name: "Productos",
  data(){
    return{
      searchRules:[(v) => (v.length <=50)|| "El nombre del insumo solo puede ser 50 caracteres"],
      search:'',
      editedItem:{},
      dialogDelete:false,
      dialogSuccess: false,
      messageSuccess: '',
      labelSearch:"Buscar por nombre de producto",
    }
  },
  components:{
    "search-bar":SearchBar,
    "tabla-productos":TablaProductos,
    "eliminar-producto":EliminarProducto,
  },
  methods:{
    saveItem(){
      this.$router.push('productos/nuevo');
    },
    //handlers
    handleEvent1(input) {
      this.search = input;
    },
    handleDeleteEvent(input){
      this.editedItem = input;
      this.handleConfirmDeleteEvent(true);
    },
    handleConfirmDeleteEvent(input){
      this.dialogDelete = input;
    },
    handleSuccess(input){
      this.dialogSuccess = false;
    },
    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
  },
  computed:{
    ...mapState({
      role: state => state.login.login.role,
    }),
    optionsForSupervisor:{
      get(){
        if (this.role === null || this.role === undefined) return '';
        return this.role;
      }
    }
  }
}
</script>

<style scoped>

</style>
