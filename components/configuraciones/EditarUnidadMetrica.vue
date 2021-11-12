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
                    v-model="editItem.name"
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
import {unitMetricNameRules} from "@/helpers/validation";
import {mapActions} from "vuex";

export default {
  name: "EditarUnidadMetrica",
  data(){
    return{
      dialogConfirm:false,
      isFormValid:false,
      editedItem:{},
      messageConfirm:'¿Está seguro de actualizar la unidad métrica?',
      unitMetricNameValidation:unitMetricNameRules,
    }
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
  components:{
    "mensaje-confirmacion":MensajeConfirmacion,
  },
  methods:{
    ...mapActions({
      editUnitMetric: 'configuraciones/configurations/editUnitMetric',
      getUnitMetrics: 'insumos/supply/getUnitMetricTypes',
    }),
    async save () {
      await this.editUnitMetric({unitMetric:this.editedItem})
      await this.getPaginatedUnitMetrics();
      this.closeSuccess()
    },
    async savePendingConfirm(){
      this.dialogConfirm = true;
    },
    async getPaginatedUnitMetrics(){
      await this.getUnitMetrics({communityId:1});
    },
    close () {
      this.edit = Object.assign({}, this.defaultItem);
      this.$emit('event-edit', false);
    },
    closeSuccess () {
      this.$emit('event-edit', false);
      this.$emit('event-action-success', "Insumo actualizado exitosamente!");
    },
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if (value){
        this.save();
      }
    },
  },
  computed:{
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

</style>
