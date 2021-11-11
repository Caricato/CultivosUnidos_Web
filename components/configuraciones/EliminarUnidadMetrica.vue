<template>
  <mensaje-confirmacion
    :dialog-confirm="dialogConfirm"
    :message="messageConfirm"
    @event-validate="handlePendingConfirm"
  />
</template>

<script>
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import {mapActions, mapState} from "vuex";
import {getError} from "@/helpers/error";

export default {
  name: "EliminarUnidadMetrica",
  components:{
    "mensaje-confirmacion":MensajeConfirmacion
  },
  data(){
    return{
      messageConfirm:'¿Está seguro de eliminar la unidad métrica?'
    }
  },
  props:{
    dialogConfirm:{
      type:Boolean,
      default:false,
    },
    editedItem:{
      type:Object,
      default:null,
    }
  },
  methods:{
    ...mapActions({
      deleteUnitMetric: 'configuraciones/configurations/deleteUnitMetric',
      getUnitMetrics: 'insumos/supply/getUnitMetricTypes',
      cleanError: 'configuraciones/configurations/cleanError',
    }),
    async getPaginatedUnitMetrics(){
      await this.getUnitMetrics({communityId:1});
    },
    //Handlers
    handlePendingConfirm(value){
      this.$emit('event-delete',false);
      if (value){
        this.save();
      }
    },
    async save () {
      await this.deleteUnitMetric({unitMetricId:this.editedItem.unitMetricId});
      if (this.error === null){
        await this.getPaginatedUnitMetrics();
        this.$emit('event-action-success', "Unidad métrica eliminada correctamente!");
      }
      else{
        this.$emit('event-action-error', getError(this.error));
        await this.cleanError();
      }
    },
  },
  computed:{
    ...mapState({
      error: state => state.insumos.supply.error,
    }),
  }
}
</script>

<style scoped>

</style>
