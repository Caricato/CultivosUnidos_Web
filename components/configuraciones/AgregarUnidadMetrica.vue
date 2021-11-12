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
                  <div class="text-h6 primary-color"><br/>NOMBRE DE UNDIAD MÉTRICA</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.name"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    :rules = unitMetricNameValidation
                    label="Ingresar nombre"
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
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import {mapActions} from "vuex";
import {unitMetricNameRules} from "@/helpers/validation";

export default {
  name: "AgregarUnidadMetrica",
  data(){
    return{
      dialogConfirm:false,
      isFormValid:false,
      messageConfirm:'¿Está seguro de agregar la unidad métrica?',
      unitMetricNameValidation:unitMetricNameRules,
    }
  },
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
      registerUnitMetric: 'configuraciones/configurations/registerUnitMetric',
      getUnitMetrics: 'insumos/supply/getUnitMetricTypes',
    }),
    async savePendingConfirm(){
      this.dialogConfirm = true;
    },
    close () {
      this.cleanForms();
      this.$emit('event-register', false);
    },
    closeSuccess () {
      this.cleanForms();
      this.$emit('event-register', false);
      this.$emit('event-action-success', "Nueva unidad metrica registrada exitosamente!");
    },
    cleanForms(){
      this.$refs.formRegister.reset();
    },

    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if (value){
        this.save();
      }
    },
    async getPaginatedUnitMetrics(){
      await this.getUnitMetrics({communityId:1});
    },
    async save(){
      this.defaultItem.communityId = 1;
      await this.registerUnitMetric({unitMetric:this.defaultItem});
      await this.getPaginatedUnitMetrics();
      this.closeSuccess();
    },
  },
}
</script>

<style scoped>
.my-input input{
  text-transform: uppercase
}
</style>
