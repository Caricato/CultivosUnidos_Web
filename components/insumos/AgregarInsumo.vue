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
          <span class="text-h6">REGISTRAR NUEVO INSUMO</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="formRegister"
              v-model="isFormValid"
            >
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>NOMBRE</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.supplyName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    :rules = supplyNameValidation
                    label="Ingresar nombre"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>CANTIDAD</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.stock"
                    outlined
                    :rules="[...supplyStockValidation, ...rules.first]"
                    label="Ingresar cantidad"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>UNIDAD</div>
                </v-col>
                <v-col>
                  <v-select
                    hide-selected
                    outlined
                    :rules="supplyMetricTypeValidation"
                    label="Seleccione unidad"
                    class = "mt-4"
                    :items="metricTypes"
                    v-model="defaultItem.supplyMetricType"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>PRECIO UNITARIO</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.unitPricing"
                    outlined
                    :rules="supplyUnitPricingValidation"
                    label="Ingresar precio unitario"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>CANTIDAD MINIMA</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.stockMin"
                    :rules="[...supplyStockMinValidation, ...rules.second]"
                    outlined
                    label="Ingresar stock minimo"
                    class="shrink  mt-4"
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
  supplyMetricTypeRules
} from "@/helpers/validation";
import MensajeConfirmacion from "@/components/MensajeConfirmacion";

export default {
  name: "AgregarInsumo",
  data: () => ({
    supplyNameValidation:supplyNameRules,
    supplyStockValidation:supplyStockRules,
    supplyUnitPricingValidation:supplyUnitPricingRules,
    supplyMetricTypeValidation:supplyMetricTypeRules,
    supplyStockMinValidation:supplyStockMinRules,
    dialogConfirm:false,
    isFormValid:false,
    messageConfirm:'¿Está seguro de registrar el insumo?'
  }),
  components:{
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
    await this.getMetricTypes();
  },

  computed:{
    ...mapState({
      metricTypes: state => state.insumos.supply.metricTypes,
    }),
    rules() {
      const valid = Number(this.defaultItem.stock) < Number(this.defaultItem.stockMin);
      return{
        first: [() => !valid || "No debe ser menor a la cantidad mínima"],
        second: [() => !valid || "No debe ser mayor a la cantidad"],
      };
    }
  },

  methods:{
    ...mapActions({
        getSupplies: 'insumos/supply/getSupplies',
        registerSupply: 'insumos/supply/registerSupply',
        getSupplyMetricTypes: 'insumos/supply/getSupplyMetricTypes',
      }
    ),

    async getMetricTypes(){
      await this.getSupplyMetricTypes();
    },

    async getPaginatedSupplies(){
      await this.getSupplies({companyId:1});
    },
    async registerNewSupply(supply){
      await this.registerSupply(supply);
    },

    async savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save(){
      this.defaultItem.communityId = 1;
      await this.registerNewSupply({supply:this.defaultItem});
      await this.getPaginatedSupplies();
      this.closeDeleteSuccess();
    },
    close () {
      this.cleanForms();
      this.$emit('event-register', false);
    },
    closeDeleteSuccess () {
      this.cleanForms();
      this.$emit('event-register', false);
      this.$emit('event-action-success', "Nuevo insumo registrado exitosamente!");
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
