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
          <span class="text-h6">EDITAR PARAMETRO</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <div class="text-h6 primary-color"><br/>PARAMETRO</div>
              </v-col>
              <v-col
                class="mt-3">
                <span>{{editItem.key}}</span>
              </v-col>
            </v-row>
            <v-form
              ref="formRegister"
              v-model="isFormValid"
            >
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>VALOR</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="editItem.value"
                    outlined
                    label="Ingresar el valor de configuración"
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
  name: "EditParametro",
  data: () => ({
    dialogConfirm:false,
    isFormValid:false,
    editedItem:{},
    messageConfirm:'¿Está seguro de actualizar el parametro?'
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

  methods:{
    ...mapActions({
        editScheduleConfig:'configuraciones/configurations/editScheduleConfig',
        getScheduleConfig: 'configuraciones/configurations/getScheduleConfig',
        cleanError: 'configuraciones/configurations/cleanError',
      }
    ),

    async savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async getAllScheduleConfig(){
      await this.getScheduleConfig({communityId:1});
    },

    async save(){
      this.editedItem.communityId = 1;
      await this.editScheduleConfig({parameters:this.editedItem});
      if (this.error === null){
        await this.getAllScheduleConfig();
        await this.closeSuccess();
      }
      else{
        await this.cleanError();
        this.$emit('event-action-success', false);
        await this.close();
      }
    },
    close () {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.$emit('event-register', false);
    },
    async closeSuccess () {
      this.$emit('event-register', false);
      this.$emit('event-action-success', true);
    },

    //Handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if (value){
        this.save();
      }
    },
  },

  computed:{
    ...mapState({
      error: state => state.configuraciones.configurations.error,
    }),
    editItem:{
      get(){
        this.editedItem = Object.assign({}, this.defaultItem);
        return this.editedItem;
      },
      set(v){
        this.editedItem = v
      },
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
