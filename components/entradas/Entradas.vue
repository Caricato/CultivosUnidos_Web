<template>
  <v-container>
    <v-row>
      <v-col>
        <menu-date-picker
          @event-change-date="handlerChangeStartDate"
        ></menu-date-picker>
      </v-col>
      <v-col>
        <menu-date-picker
          @event-change-date="handlerChangeEndDate"
        ></menu-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-entradas
          :entries="entries"
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
      startMenu: false,
      endMenu: false,
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },

  methods:{
    ...mapActions({
      getEntries: 'entradas/entry/getEntriesInDateRange',
    }),
    async getPaginatedEntries(){
      await this.getEntries({communityId: 1, startDate: this.startDate, endDate: this.endDate });
    },

    //handlers
    async handlerChangeStartDate(input){
      this.startDate = input;
      await this.getPaginatedEntries();
    },

    async handlerChangeEndDate(input){
      this.endDate = input;
      await this.getPaginatedEntries();
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
