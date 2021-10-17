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
          ASOCIAR A NUEVO PRODUCTOR AGRÍCOLA
        </v-btn>
        <agregar-productor
          :dialog='dialogSave'
          :default-item='defaultItem'
          @event-register="handleConfirmRegisterEvent"
          @event-action-success="handleActionSuccess"
        />
        <editar-productor
          :dialog='dialogEdit'
          :default-item='editedItem'
          @event-edit="handleConfirmEditEvent"
          @event-action-success="handleActionSuccess"
        />
        <accion-correcta :dialog-success="dialogSuccess" :message="messageSuccess" @event-success="handleSuccess"/>
        <accion-error :dialog-error="dialogError" :message="messageError" @event-success="handleSuccess"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-productores :items="producers" :loading="loading" :search="search"
                           @event-edit-pending="handleEditEvent"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import TablaProductores from "@/components/productores/TablaProductores";
import {mapActions, mapState} from "vuex";
import AccionCorrecta from "@/components/AccionCorrecta";
import AccionError from "@/components/AccionError";
import AgregarProductor from "@/components/productores/AgregarProductor";
import EditarProductor from "@/components/productores/EditarProductor";

export default {
  name: "Productores",
  components:{
    'search-bar':SearchBar,
    'tabla-productores':TablaProductores,
    "accion-correcta":AccionCorrecta,
    "accion-error":AccionError,
    "agregar-productor":AgregarProductor,
    "editar-productor":EditarProductor,
  },
  data(){
    return{
      defaultItem: {
        dni: '',
        producerName: '',
        producerFirstLastName: '',
        producerSecondLastName: '',
        email: '',
        address: '',
        hectares: null,
      },
      search:'',
      dialogSave: false,
      dialogSuccess: false,
      messageSuccess: '',
      dialogError: false,
      messageError: '',
      dialogEdit:false,
      editedItem:{},
      labelSearch:"Buscar por nombre, apellidos, DNI o correo electrónico",
      searchRules:[(v) => (v.length <=50)|| "El campo de busqueda no puede superar los 50 caractéres"],
    }
  },

  async mounted(){
    await this.getProducers({communityId:this.userAuth.communityId});
  },

  methods:{
    ...mapActions({
      getProducers:'productores/producers/getProducers',
    }),
    saveItem(){
      this.dialogSave = true;
    },
    //handlers
    handleEvent1(input) {
      this.search = input;
    },
    handleSuccess(input){
      this.dialogSuccess = false;
      this.dialogError = false;
    },
    handleEditEvent(input){
      this.editedItem = input;
      this.handleConfirmEditEvent(true);
    },
    handleConfirmRegisterEvent(input){
      this.dialogSave = input;
    },
    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
    handleConfirmEditEvent(input){
      this.dialogEdit = input;
    },
  },

  computed:{
    ...mapState({
      producers: state => state.productores.producers.producers,
      loading: state => state.productores.producers.loading,
      userAuth:state => state.login.login.userAuth,
      role: state => state.login.login.role,
    }),
    optionsForSupervisor:{
      get(){
        if (this.role === null || this.role === undefined) return '';
        return this.role;
      }
    }
  },
}
</script>

<style scoped>

</style>
