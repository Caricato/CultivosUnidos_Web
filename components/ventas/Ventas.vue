<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
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
        <v-data-table :headers="headers"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Ventas",
  data(){
    return{
      startLabel: "Ingresa fecha inicial",
      endLabel: "Ingresa fecha final",
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      detailsInvalid: false,
      headers:[
        {
          text: "Fecha de venta",
          value: "product.productName",
          sortable: false,
          width: "500px",
        },
        {
          text: "Ganancia total",
          value: "entryCant"
        },
        {
          text: "Ver detalle",
          value: "metricType",
          align: "center"
        },
      ],
    }
  },
  methods:{
    registerSell(){
      this.$router.push("/ventas/nuevo")
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
  }
}
</script>

<style scoped>

</style>
