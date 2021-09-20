<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          @click="registerEntry"
        >
          NUEVA ENTRADA DE PRODUCTOS
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <menu-date-picker
          :label="startLabel"
          @event-change-date="handlerChangeStartDate"
        ></menu-date-picker>
      </v-col>
      <v-col>
        <menu-date-picker
          :label="endLabel"
          @event-change-date="handlerChangeEndDate"
        ></menu-date-picker>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <span style="color: red" v-if="detailsInvalid"> ERROR! Fecha inicial no puede ser mayor a fecha final</span>
    </v-row>
    <v-row>
      <v-col>
        <tabla-entradas
          :entries="entries"
          :detail-route="detailRoute"
        ></tabla-entradas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuDatePicker from "@/components/MenuDatePicker";
import TablaEntradas from "@/components/entradas/TablaEntradas";
import {mapActions, mapState} from "vuex";

export default {
  name: "EntradasProducto",
  components:{
    "menu-date-picker": MenuDatePicker,
    "tabla-entradas":TablaEntradas
  },

  data(){
    return{
      startLabel: "Ingresa fecha inicial",
      endLabel: "Ingresa fecha final",
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      detailRoute: '/entradasProducto/detalle/',
      detailsInvalid: false,
    }
  },

  async mounted(){
    await this.getPaginatedEntries();
  },

  methods:{
    ...mapActions({
      getEntries: 'entradas/entry/getEntriesInDateRange',
      cleanTable: 'entradas/entry/cleanTable',
    }),
    async getPaginatedEntries(){
      await this.getEntries({communityId: 1, startDate: this.startDate, endDate: this.endDate, subtype:"ENTRADA_PRODUCTO" });
    },

    registerEntry(){
      this.$router.push('/entradasProducto/nuevo');
    },

    checkValidDates(){
      this.detailsInvalid = this.endDate < this.startDate;
      if (this.detailsInvalid) this.cleanTable();
    },

    //handlers
    async handlerChangeStartDate(input){
      this.startDate = input;
      this.checkValidDates();
      if (!this.detailsInvalid) await this.getPaginatedEntries();
    },

    async handlerChangeEndDate(input){
      this.endDate = input;
      this.checkValidDates();
      if (!this.detailsInvalid) await this.getPaginatedEntries();
    },
  },
  computed:{
    ...mapState({
      entries: state => state.entradas.entry.entries,
      loading: state => state.entradas.entry.loading,
    }),
  },
}
</script>

<style scoped>

</style>
