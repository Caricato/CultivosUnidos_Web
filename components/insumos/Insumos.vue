<template>
  <v-container>
    <v-row>
      <v-col>
        <search-bar @event-1 = "handleEvent1" :rules="searchRules"/>
      </v-col>
      <v-col class="text-right">
        <v-btn
          color="success"
          dark
          class="ma-6 mr-15"
          @click="saveItem()"
        >
          AGREGAR
        </v-btn>

        <agregar-insumo
          :dialog='dialogSave'
          :default-item='defaultItem'
          @event-register="handleConfirmRegisterEvent"
          @event-action-success="handleActionSuccess"
        />

        <editar-insumo
          :dialog='dialogEdit'
          :default-item='editedItem'
          @event-edit="handleConfirmEditEvent"
          @event-action-success="handleActionSuccess"
        />

        <eliminar-insumo
          :dialogConfirm='dialogDelete'
          :edited-item='editedItem'
          @event-delete="handleConfirmDeleteEvent"
          @event-action-success="handleActionSuccess"
        />

        <accion-correcta :dialog-success="dialogSuccess" :message="messageSuccess" @event-success="handleSuccess"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-insumos
          :supplies = 'supplies'
          :loading = 'loading'
          :search = 'search'
          @event-edit-pending="handleEditEvent"
          @event-delete-pending="handleDeleteEvent"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <exportar-insumos :search="search"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import TablaInsumos from "@/components/insumos/TablaInsumos";
import SearchBar from "@/components/SearchBar";
import AgregarInsumo from "@/components/insumos/AgregarInsumo";
import AccionCorrecta from "@/components/AccionCorrecta";
import EliminarInsumo from "@/components/insumos/EliminarInsumo";
import EditarInsumo from "@/components/insumos/EditarInsumo";
import ExportarInsumo from "@/components/insumos/ExportarInsumo";

export default {
  name: "Insumos",
  components:{
    "tabla-insumos":TablaInsumos,
    "agregar-insumo":AgregarInsumo,
    "editar-insumo":EditarInsumo,
    "eliminar-insumo":EliminarInsumo,
    "exportar-insumos":ExportarInsumo,
    "search-bar":SearchBar,
    "accion-correcta":AccionCorrecta,
  },
  data: () => ({
    defaultItem: {
      supplyName: '',
      stock: null,
      supplyMetricType: 'SELECCIONAR',
      unitPricing: null,
      stockMin: null,
    },
    editedItem:{},
    dialogSave: false,
    dialogEdit:false,
    dialogDelete:false,
    dialogSuccess: false,
    messageSuccess: '',
    search: '',
    searchRules:[(v) => (v.length <=50)|| "El nombre del insumo solo puede ser 50 caracteres"],
  }),

  async mounted() {
    await this.getPaginatedSupplies();
  },

  methods:{
    ...mapActions({
      getSupplies: 'insumos/supply/getSupplies',
    }),
    async getPaginatedSupplies(){
      await this.getSupplies({companyId:1});
    },

    //EVENTOS DE COMPONENTES
    handleEvent1(input) {
      this.search = input;
    },

    handleEditEvent(input){
      this.editedItem = input;
      this.handleConfirmEditEvent(true);
    },

    handleDeleteEvent(input){
      this.editedItem = input;
      this.handleConfirmDeleteEvent(true);
    },

    handleConfirmRegisterEvent(input){
      this.dialogSave = input;
    },

    handleConfirmEditEvent(input){
      this.dialogEdit = input;
    },

    handleConfirmDeleteEvent(input){
      this.dialogDelete = input;
    },

    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
    handleSuccess(input){
      this.dialogSuccess = false;
    },
    saveItem(){
      this.dialogSave = true;
    },
    generateBudget(){
      this.$router.push('/insumos/presupuesto');
    },
  },

  computed:{
    ...mapState({
      loading: state => state.insumos.supply.loading,
      error: state => state.insumos.supply.error,
      message: state => state.insumos.supply.message,
      supplies: state => state.insumos.supply.supplies,
      page: state => state.insumos.supply.page,
      community: state => state.comunidad.community,
    }),
  }

}
</script>

<style scoped>

</style>
