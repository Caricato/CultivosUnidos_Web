<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          v-show="optionsForSupervisor === 'SUPERVISOR'"
          @click="registerSell"
        >
          INGRESAR RESULTADOS DE VENTA
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col align-self="center" cols="12" lg="2">
        <span>Fecha Inicio: </span>
      </v-col>
      <v-col>
        <menu-date-picker
          :label="startLabel"
          @event-change-date="handlerChangeStartDate"
        ></menu-date-picker>
      </v-col>
      <v-col align-self="center" cols="12" lg="2" class="ml-16">
        <span>Fecha Fin: </span>
      </v-col>
      <v-col>
        <menu-date-picker
          :label="endLabel"
          @event-change-date="handlerChangeEndDate"
        ></menu-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-ventas></tabla-ventas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import TablaVentas from "@/components/ventas/TablaVentas";

export default {
  name: "Ventas",
  data(){
    return{
      startLabel: "Ingresa fecha inicial",
      endLabel: "Ingresa fecha final",
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      detailsInvalid: false,
    }
  },
  components:{
    'tabla-ventas':TablaVentas,
  },
  async mounted(){
    await this.getAllSales();
  },
  methods:{
    ...mapActions({
      getSales: 'ventas/sales/getSales',
    }),
    registerSell(){
      this.$router.push("/ventas/nuevo")
    },
    async getAllSales(){
      await this.getSales({communityId:1, startDate:this.startDate, endDate:this.endDate});
    },
    //handlers
    async handlerChangeStartDate(input){
      this.startDate = input;
      this.checkValidDates();
      if (!this.detailsInvalid) await this.getAllSales();
    },

    async handlerChangeEndDate(input){
      this.endDate = input;
      this.checkValidDates();
      if (!this.detailsInvalid) await this.getAllSales();
    },

    checkValidDates(){
      this.detailsInvalid = this.endDate < this.startDate;
      if (this.detailsInvalid) this.cleanTable();
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
