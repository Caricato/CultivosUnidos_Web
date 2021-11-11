<template>
  <v-container>
    <v-dialog
      v-model="dialogEdit"
      persistent
      max-width="700px"
      @keydown.esc="close"
    >
      <v-card>
        <v-card-title class ="text-h6; justify-center">
          <span class="text-h6">EDITAR NUEVO INSUMO</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="formEdit"
              v-model="isFormValid"
            >
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>NOMBRE</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="editItem.supplyName"
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
                    v-model="editItem.stock"
                    outlined
                    disabled
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
                    item-text="name"
                    item-value="unitMetricId"
                    v-model="editItem.supplyMetricType"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>PRECIO UNITARIO</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="editItem.unitPricing"
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
                    v-model="editItem.stockMin"
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
import {
  supplyMetricTypeRules,
  supplyNameRules,
  supplyStockMinRules,
  supplyUnitPricingRules
} from "@/helpers/validation";
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import {mapActions, mapState} from "vuex";

export default {
  name: "EditarInsumo",
  data: () => ({
    supplyNameValidation:supplyNameRules,
    supplyUnitPricingValidation:supplyUnitPricingRules,
    supplyMetricTypeValidation:supplyMetricTypeRules,
    supplyStockMinValidation:supplyStockMinRules,
    dialogConfirm:false,
    isFormValid:false,
    editedItem:{},
    messageConfirm:'¿Está seguro de actualizar el insumo?'
  }),
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
  components:{
    "mensaje-confirmacion":MensajeConfirmacion,
  },

  async mounted() {
    await this.getMetricTypes();
  },

  methods:{
    ...mapActions({
      getSupplies: 'insumos/supply/getSupplies',
      editSupply: 'insumos/supply/editSupply',
      getUnitMetricTypes: 'insumos/supply/getUnitMetricTypes',
      getSupply: 'insumos/supply/getSupply',
    }),
    async getMetricTypes(){
      await this.getUnitMetricTypes({communityId:1});
    },

    async getPaginatedSupplies(){
      await this.getSupplies({companyId:1});
    },

    async updateSupply(supply){
      await this.editSupply(supply);
    },

    async savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save () {
      await this.updateSupply({supply:this.editedItem})
      await this.getPaginatedSupplies(1);
      this.closeSuccess()
    },

    close () {
      this.edit = Object.assign({}, this.defaultItem);
      this.$emit('event-edit', false);
    },
    closeSuccess () {
      this.$emit('event-edit', false);
      this.$emit('event-action-success', "Insumo actualizado exitosamente!");
    },

    //handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      this.$emit('event-edit-pending',false);
      if (value){
        this.save();
      }
    },
  },

  computed:{
    ...mapState({
      metricTypes: state => state.insumos.supply.metricTypes,
      supplies: state => state.insumos.supply.supplies,
    }),
    rules() {
      const valid = Number(this.editItem.stock) < Number(this.editItem.stockMin);
      return{
        second: [() => !valid || "No debe ser mayor a la cantidad"],
      };
    },

    editItem:{
      get(){
        this.editedItem = Object.assign({}, this.defaultItem);
        return this.editedItem;
      },
      set(v){
        this.editedItem = v
      },
    },
    dialogEdit:{
      get(){
        this.editedItem = Object.assign({}, this.defaultItem);
        return this.dialog;
      }
    }
  },
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
