<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          v-show="optionsForSupervisor === 'SUPERVISOR'"
          @click="registerEntry"
        >
          NUEVA ENTRADA DE INSUMOS
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
import {mapActions, mapState} from "vuex";
import TablaEntradas from "@/components/entradas/TablaEntradas";

export default {
  name: "Entradas",
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
      detailRoute: '/entradas/detalle/',
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
      await this.getEntries({communityId: 1, startDate: this.startDate, endDate: this.endDate, subtype:"ENTRADA_INSUMO" });
    },

    registerEntry(){
      this.$router.push('/entradas/nuevo');
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

    checkValidDates(){
      this.detailsInvalid = this.endDate < this.startDate;
      if (this.detailsInvalid) this.cleanTable();
    },
  },
  computed:{
    ...mapState({
      entries: state => state.entradas.entry.entries,
      loading: state => state.entradas.entry.loading,
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
