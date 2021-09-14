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

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-insumos
          :headers = 'headers'
          :supplies = 'supplies2'
          :loading = 'loading'
          :search = 'search'
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="end">

      </v-col>
      <v-col>
        <v-btn
          color="success"
          dark
          class="ml-10 ma-15"
          @click="generateBudget()"
        >
          GENERAR PRESUPUESTO
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import TablaInsumos from "@/components/insumos/TablaInsumos";
import SearchBar from "@/components/SearchBar";

export default {
  name: "Insumos",
  components:{
    "tabla-insumos":TablaInsumos,
    "search-bar":SearchBar,
  },
  data: () => ({
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        filterable: true,
        sortable: false,
        value: 'supplyName',
      },
      { text: 'Cantidad', value: 'stock' , filterable: false},
      { text: 'Unidad métrica', value: 'supplyMetricType', filterable:false },
      { text: 'Precio Unitario (S/.)', value: 'unitPricing', filterable:false },
      { text: 'Cantidad mínima', value: 'stockMin', filterable:false },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    defaultItem: {
      supplyName: '',
      stock: null,
      supplyMetricType: 'SELECCIONA EL TIPO DE UNIDAD',
      unitPricing: null,
      stockMin: null,
    },
    dialogSave: false,
    dialogSuccess: false,
    messageSuccess: '',
    search: '',
    searchRules:[
      (v) =>
        (v.length <=50)|| "El nombre del insumo solo puede ser 50 caracteres"
    ],
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
    handleEvent1(input) {
      this.search = input;
    },

    handleRegisterEvent(input){
      this.dialogSave = input;
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
      supplies2: state => state.insumos.supply.supplies,
      page: state => state.insumos.supply.page,
      community: state => state.comunidad.community,
    }),
  }

}
</script>

<style scoped>

</style>
