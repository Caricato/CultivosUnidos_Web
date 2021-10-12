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
            background-color="#f1f1f1"
            color="green lighten-2"
            center-active
            grow
          >
            <v-tab href="#statistics">ESTADISTICO</v-tab>
            <v-tab href="#details">DETALLE</v-tab>
            <v-tab-item value="statistics">
              <v-row>
                <v-col>
                  <apexchart class="mt-3" type="line" height="350" :options="chartOptions" :series="series"></apexchart>
                </v-col>
              </v-row>
              <v-divider/>
              <v-row>
                <v-col>
                  <apexchart class="mt-3" type="donut" height="350" :options="chartOptionsDonut" :series="seriesDonut"></apexchart>
                </v-col>
                <v-divider class="mt-3" vertical/>
                <v-col>
                  <apexchart class="mt-3" type="bar" height="350" :options="chartOptionsBar" :series="seriesBar"></apexchart>
                </v-col>
              </v-row>
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
        name: 'Ganancia Total (en miles de soles)',
        type: 'column',
        data: []
      }, {
        name: 'Ganancia Proyectada (en miles de soles)',
        type: 'column',
        data: []
      }, {
        name: 'Indicador Real/Proyectada (en %)',
        type: 'line',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
          toolbar:{
            show:true,
            tools:{
              download:true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            }
          },
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
              text: "Ganancia real de venta (en miles de soles)",
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
      seriesDonut: [],
      chartOptionsDonut: {
        chart: {
          type: 'donut',
          toolbar:{
            show:true,
            tools:{
              download:true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            }
          },
        },
        labels: [],
        title: {
          text: 'Ganancia por producto en soles',
          align: 'left',
          offsetX: 110,
          style: {
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Montserrat',
            color: '#505050',
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      seriesBar: [{
        name:'',
        data: []
      }],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          height: 350
        },
        title: {
          text: 'Sacos vendidos',
          align: 'left',
          offsetX: 110,
          style: {
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'Montserrat',
            color: '#505050',
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
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
      if (this.report !== null && this.report !== undefined && this.report.length !== 0){
        this.series[0] = {...this.series[0],...{
            data: this.report[0].data
          }}
        this.series[1] = {...this.series[1],...{
            data: this.report[1].data
          }}
        this.series[2] = {...this.series[2],...{
            data: this.report[2].data
          }}
      }
      if (this.categories !== null && this.categories !== undefined && this.categories.length !== 0){
        this.chartOptions = {...this.chartOptions, ...{
            xaxis: {
              categories: this.categories
            }
          }}
      }

      if (this.sacksReport !== null && this.sacksReport !== undefined && this.sacksReport.length !== 0){
        this.seriesBar[0].data = Object.assign([], this.sacksReport);
      }

      if (this.subtotalReport !== null && this.subtotalReport !== undefined && this.subtotalReport.length !== 0){
        this.seriesDonut = Object.assign([], this.subtotalReport);
      }

      if (this.productLabels !== null && this.productLabels !== undefined && this.productLabels.length !== 0){
        this.chartOptionsDonut = {...this.chartOptionsDonut, ...{
          labels: this.productLabels
          }
        }

        this.chartOptionsBar = {...this.chartOptionsBar, ...{
          xaxis:{
            categories: this.productLabels
          }
          }

        }
      }

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
      sacksReport: state => state.ventas.sales.sacksReport,
      subtotalReport: state => state.ventas.sales.subtotalReport,
      productLabels: state => state.ventas.sales.productsLabels,
    }),
  }
}
</script>

<style scoped>

</style>
