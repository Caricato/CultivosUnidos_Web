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
          @event-register="handleRegisterEvent"
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
import AgregarInsumo from "@/components/insumos/AgregarInsumo";
import AccionCorrecta from "@/components/AccionCorrecta";

export default {
  name: "Insumos",
  components:{
    "tabla-insumos":TablaInsumos,
    "agregar-insumo":AgregarInsumo,
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
      console.log("HOLA");
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
