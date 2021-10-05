<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs
            background-color="#f1f1f1"
            color="green lighten-2"
            center-active
            grow
          >
            <v-tab href="#production">POR PRODUCCION</v-tab>
            <v-tab href="#earnings">POR GANANCIA DESEADA</v-tab>
            <v-tab-item value="production">
              <v-row >
                <v-col class="text-center">
                  <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>MES DE VENTA:</div>
                </v-col>
                <v-col align="center" class="mt-2">
                  <v-select label="SELECCIONAR EL MES DE LA VENTA" class="mt-3 mr-16" :items="months" item-value="value" item-text="text" v-model="month">
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <tabla-productos @event-fill-products="handlerFillProducts"/>
                </v-col>
              </v-row>
              <v-row align="center"
                     justify="center">
                <v-btn
                  color="green lighten-2"
                  dark
                  class="mt-5 mb-10"
                  outlined
                  @click="projection"
                >
                  PROYECTAR
                </v-btn>
              </v-row>
            </v-tab-item>
            <v-tab-item value="earnings">
              <v-row>
                <v-col class="text-center">
                  <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>INGRESAR LA GANANCIA TOTAL (S/.):</div>
                </v-col>
                <v-col>
                  <v-text-field align="center" class="mt-6 shrink prueba" v-model="total" label="Ingresar la ganancia total esperada" outlined dense></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>MES DE VENTA:</div>
                </v-col>
                <v-col align="center" class="mt-2">
                  <v-select label="SELECCIONAR EL MES DE LA VENTA" class="mt-3 mr-16" :items="months" item-value="value" item-text="text" v-model="month">
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <tabla-productos-ganancia/>
                </v-col>
              </v-row>
              <v-row align="center"
                     justify="center">
                <v-btn
                  color="green lighten-2"
                  dark
                  class="mt-5 mb-10"
                  outlined
                >
                  PROYECTAR
                </v-btn>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablaProductos from "@/components/proyecciones/produccion/TablaProductos";
import VueRouter from 'vue-router'
import {mapActions} from "vuex";
import TablaProductosGanancia from "@/components/proyecciones/ganancia/TablaProductosGanancia";

export default {
  name: "Proyecciones",
  data(){
    return{
      month: null,
      total: '',
      products:[],
      cantValidation: true,
      months:["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    }
  },
  components:{
    "tabla-productos":TablaProductos,
    "tabla-productos-ganancia":TablaProductosGanancia,
  },
  methods:{
    ...mapActions({
      getProjectCrops:"proyecciones/projections/getProjectCrops",
    }),

    async getProjectReportCrops(){
      console.log(this.month);
      console.log(this.products);
      await this.getProjectCrops({month:this.month, products:this.products});
      console.log(this.projectCrops);
    },

    async projection(){
      await this.getProjectReportCrops();
      await this.$router.push('/proyecciones/cultivo');
    },

    checkCants(input){
      const checkSacksEmpty = ''.localeCompare(input.soldSacks) === 0;
      const checkNumbers = !Number.isInteger(Number(input.soldSacks)) || !Number.isFinite(Number(input.soldSacks));
      const checkNull = input.soldSacks === null || input.soldSacks === undefined;
      if (checkSacksEmpty||checkNumbers||checkNull){
        this.cantValidation = true;
      }else{

        input.soldSacks = Number.parseInt(input.soldSacks);
      }
    },

    //handlers
    handlerFillProducts(input){
      this.products = input;
      this.cantValidation = this.products.length === 0;
      this.products.forEach( x=>{
        this.checkCants(x);
      })
    },
  }
}
</script>

<style scoped>
.prueba{
  width: 400px;
}
</style>
