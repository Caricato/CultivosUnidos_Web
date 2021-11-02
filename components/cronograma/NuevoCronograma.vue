<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700px"
      @keydown.esc="close"
    >
      <v-card>
        <v-card-title class ="text-h6; justify-center">
          <span class="text-h6">REGISTRAR NUEVO CRONOGRAMA</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <div class="text-h6 primary-color"><br/>FECHA INICIO</div>
              </v-col>
              <v-col
                class="mt-3">
                <menu-datepicker
                  :label="labelDate"
                  @event-change-date="handlerChangeStartDate"
                >
                </menu-datepicker>
              </v-col>
            </v-row>
            <v-form
              ref="formRegister"
              v-model="isFormValid"
            >
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>HECTAREAS A PRODUCIR</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.hectares"
                    outlined
                    :rules="supplyStockValidation"
                    label="Ingresar cantidad de hectareas"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>PRODUCTO</div>
                </v-col>
                <v-col>
                  <v-select
                    hide-selected
                    outlined
                    :rules="productValidation"
                    label="Seleccione el producto a cultivar"
                    class = "mt-4"
                    item-value="productId" item-text="productName"
                    :items="productsToSelect"
                    v-model="defaultItem.productId"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>CANTIDAD DE PRODUCTORES</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.cantProducers"
                    outlined
                    :rules="scheduleProducersValidation"
                    label="Ingresar numero de productores"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-card-actions>
              <v-row class="ml-15 mt-2">
                <v-col class="ml-15">
                  <v-btn depressed color="error"  @click="close">CANCELAR</v-btn>
                </v-col>
                <v-col>
                  <v-btn depressed color="success" :disabled="!isFormValid" @click="savePendingConfirm">ACEPTAR</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <mensaje-confirmacion
      :dialog-confirm="dialogConfirm"
      :message="messageConfirm"
      @event-validate="handlePendingConfirm"
    />
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {
  supplyStockRules,
  supplyUnitPricingRules,
  supplyStockMinRules,
  supplyNameRules,
  supplyMetricTypeRules, budgetProductRules, scheduleProducersRules
} from "@/helpers/validation";
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import MenuDatePicker from "@/components/MenuDatePicker";
import StartDatePicker from "@/components/cronograma/StartDatePicker";

export default {
  name: "NuevoCronograma",
  data: () => ({
    supplyNameValidation:supplyNameRules,
    supplyStockValidation:supplyStockRules,
    scheduleProducersValidation:scheduleProducersRules,
    productValidation:budgetProductRules,
    supplyStockMinValidation:supplyStockMinRules,
    dialogConfirm:false,
    labelDate: "Ingresar fecha de inicio",
    isFormValid:false,
    messageConfirm:'¿Está seguro de registrar el cronograma?'
  }),
  components:{
    "menu-datepicker":StartDatePicker,
    "mensaje-confirmacion":MensajeConfirmacion,
  },
  props:{
    dialog:{
      type:Boolean,
      default:false,
    },
    defaultItem:{
      type:Object,
      default: null,
    }
  },

  async mounted() {
    await this.getAllProducts();
  },

  computed:{
    ...mapState({
      productsToSelect: state => state.presupuesto.budget.products,
      error: state =>  state.cronogramas.schedule.error,
    }),
  },

  methods:{
    ...mapActions({
        getProducts: 'presupuesto/budget/getProducts',
        registerSchedule: 'cronogramas/schedule/registerSchedule',
        getSchedules: 'cronogramas/schedule/getSchedules',
        cleanError: 'cronogramas/schedule/cleanError',
      }
    ),

    handlerChangeStartDate(input){
      this.defaultItem.startDate = input
    },

    async getAllProducts(){
      await this.getProducts({communityId:1});
    },

    async getPaginatedSchedules(){
      await this.getSchedules({communityId:1, year:new Date().getFullYear(), active:1});
    },
    async registerNewSchedule(schedule){
      await this.registerSchedule({communityId:1, schedule:schedule});
    },

    async savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save(){
      await this.registerNewSchedule({schedule:this.defaultItem});
      if (this.error === null){
        await this.getPaginatedSchedules();
        await this.closeSuccess();
      }
      else{
        await this.cleanError();
        this.$emit('event-action-success', false);
        await this.close();
      }
    },
    close () {
      this.cleanForms();
      this.$emit('event-register', false);
    },
    async closeSuccess () {
      this.cleanForms();
      this.$emit('event-register', false);
      this.$emit('event-action-success', true);
    },

    cleanForms(){
      this.$refs.formRegister.reset();
    },

    //Handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if (value){
        this.save();
      }
    },
  }
}
</script>

<style scoped>
.v-text-field{
  height: 60px;
}
.v-col{
  height:20px;
}


.primary-color{
  color: #535B6C;
}
</style>
