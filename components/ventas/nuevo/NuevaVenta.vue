<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>FECHA DE VENTA:</div>
              </v-col>
              <v-col align="center" class="mt-2">
                <menu-datepicker
                  :label="dateLabel"
                  @event-change-date="handlerChangeStartDate"
                >
                </menu-datepicker>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-venta @event-fill-products="handlerFillProducts"/>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-row align="center"
             justify="center" class="mt-3">
        <v-col class="text-right">
          <v-btn depressed color="error"  @click="$router.go(-1)">CANCELAR</v-btn>
        </v-col>
        <v-col>
          <v-btn depressed color="success" @click="savePendingConfirm">ACEPTAR</v-btn>
        </v-col>
      </v-row>
      <mensaje-confirmacion
        :dialog-confirm="dialogConfirm"
        :message="messageConfirm"
        @event-validate="handlePendingConfirm"
      >
      </mensaje-confirmacion>
      <accion-correcta
        :dialog-success= 'dialogSuccess'
        :message = 'messageSuccess'
        @event-success = "handleSuccess"
      ></accion-correcta>
    </v-card-actions>
  </v-container>
</template>

<script>
import MenuDatePicker from "@/components/MenuDatePicker";
import TablaVenta from "@/components/ventas/nuevo/TablaVenta";
import moment from "moment-timezone";
import {mapActions} from "vuex";

export default {
  name: "NuevaVenta",
  components:{
    "menu-datepicker":MenuDatePicker,
    "tabla-venta":TablaVenta,
  },
  data(){
    return{
      dateLabel:"Ingresa fecha de venta",
      entryDate: null,
      detail:[],
      dialogConfirm:false,
      messageConfirm:"¿Está seguro de realizar el registro?",
      dialogSuccess: false,
      messageSuccess:"NUEVO RESULTADO DE VENTA REGISTRADO!",
    }
  },
  methods:{
    ...mapActions({
      registerSale:'ventas/sales/registerSale',
    }),
    savePendingConfirm(){
      this.dialogConfirm = true;
    },
    async save(){
      const saleDate = (this.entryDate != null)? this.entryDate: moment().tz('America/Lima').format().slice(0, 10);
      await this.registerSale({saleDate:saleDate, detail:this.detail, communityId:1});
      this.dialogSuccess = true;
    },
    //handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if(value) this.save();
    },
    handleSuccess(value){
      this.dialogSuccess = value;
      if(!this.dialogSuccess){
        this.$router.push('/ventas')
      }
    },
    handlerChangeStartDate(input){
      this.entryDate = input
    },
    handlerFillProducts(input){
      this.detail = input;
    },
  }
}
</script>

<style scoped>

</style>
