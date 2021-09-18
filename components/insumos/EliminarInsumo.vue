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
  name: "EliminarInsumo",
  components:{
    "mensaje-confirmacion":MensajeConfirmacion
  },
  data(){
    return{
      messageConfirm:'¿Está seguro de eliminar el insumo?'
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
      deleteSupply: 'insumos/supply/deleteSupply',
      getSupplies: 'insumos/supply/getSupplies',
    }),
    async getPaginatedSupplies(){
      await this.getSupplies({companyId:1});
    },
    //Handlers
    handlePendingConfirm(value){
      this.$emit('event-delete',false);
      if (value){
        this.save();
      }
    },
    async save () {
      await this.deleteSupply({supplyId:this.editedItem.supplyId});
      if (this.error === null){
        await this.getPaginatedSupplies();
        this.$emit('event-action-success', "Insumo eliminado correctamente!");
      }
      else{
        this.$emit('event-action-error', getError(this.error));
      }
    },
  },
  computed:{
    ...mapState({
      supplies: state => state.insumos.supply.supplies,
      error: state => state.insumos.supply.error,
    }),
  }
}
</script>

<style scoped>

</style>
