<template>
  <v-container>

    <v-row>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          @click="registerSale"
        >
          INGRESAR RESULTADOS DE VENTA
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
    <v-row>
      <v-col>
        <v-card>
          <v-tabs
            background-color="green lighten-2"
            center-active
            grow
          >
            <v-tab href="#statistics" class="white--text">ESTADISTICO</v-tab>
            <v-tab href="#details" class="white--text">DETALLE</v-tab>
            <v-tab-item value="statistics">
              <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
            </v-tab-item>
            <v-tab-item value="details">
              <tabla-ventas/>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import MenuDatePicker from "@/components/MenuDatePicker";
import {mapActions, mapState} from "vuex";
import TablaVentas from "@/components/ventas/TablaVentas";

export default {
  name: "Estadisticas",
  data(){
    return{
      startLabel: "Ingresa fecha inicial",
      endLabel: "Ingresa fecha final",
      detailsInvalid: false,
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      series: [{
        name: 'Ganancia Total',
        type: 'column',
        data: []
      }, {
        name: 'Ganancia Proyectada',
        type: 'column',
        data: []
      }, {
        name: 'Indicador Real/Proyectada',
        type: 'line',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: 'Ganancias de ventas mensuales',
          align: 'left',
          offsetX: 110,
          style: {
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Montserrat',
            color: '#505050',
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#81c784'
            },
            labels: {
              style: {
                colors: '#81c784',
              }
            },
            title: {
              text: "Ganancia real de venta (en soles)",
              style: {
                style: {
                  fontSize: '16px',
                  fontWeight: '200',
                  fontFamily: 'Montserrat',
                  color: '#505050',
                },
              }
            },
            tooltip: {
              enabled: true
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    }
  },
  components:{
    "menu-date-picker": MenuDatePicker,
    "tabla-ventas":TablaVentas,
  },

  async created(){
    if (!this.detailsInvalid){
      await this.getMonthlyReport()
    }
  },

  methods:{
    ...mapActions({
      getReport:"ventas/sales/getMonthlyReport",
      getSales: 'ventas/sales/getSales',
    }),

    async getAllSales(){
      await this.getSales({communityId:1, startDate:this.startDate, endDate:this.endDate});
    },
    //handlers
    async handlerChangeStartDate(input){
      this.startDate = input;
      this.checkValidDates();
      if (!this.detailsInvalid) await this.getMonthlyReport();
    },

    registerSale(){
      this.$router.push("/ventas/nuevo")
    },

    async getMonthlyReport(){
      await this.getReport({communityId:1, startDate:this.startDate, endDate:this.endDate});
      await this.getAllSales();
      this.series[0] = {...this.series[0],...{
        data: this.report[0].data
      }}
      this.series[1] = {...this.series[1],...{
          data: this.report[1].data
        }}
      this.series[2] = {...this.series[2],...{
          data: this.report[2].data
        }}
      this.chartOptions = {...this.chartOptions, ...{
          xaxis: {
            categories: this.categories
          }
        }}
    },

    async handlerChangeEndDate(input){
      this.endDate = input;
      this.checkValidDates();
      if (!this.detailsInvalid) await this.getMonthlyReport();
    },

    checkValidDates(){
      this.detailsInvalid = this.endDate < this.startDate;
    },
  },
  computed:{
    ...mapState({
      report: state => state.ventas.sales.report,
      categories: state => state.ventas.sales.categories,
      sales: state => state.ventas.sales.sales,
    }),
  }
}
</script>

<style scoped>

</style>
