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
  name: "EliminarProductor",
  components:{
    "mensaje-confirmacion":MensajeConfirmacion
  },
  data(){
    return{
      messageConfirm:'¿Está seguro de eliminar al productor agrícola?'
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
      deleteProducer:'productores/producers/deleteProducer',
      getProducers:'productores/producers/getProducers',
    }),
    async getPaginatedProducers(){
      await this.getProducers({communityId:1});
    },
    //Handlers
    handlePendingConfirm(value){
      this.$emit('event-delete',false);
      if (value){
        this.save();
      }
    },
    async save () {
      await this.deleteProducer({producerId:this.editedItem.producerId});
      if (this.error === null){
        await this.getPaginatedProducers();
        this.$emit('event-action-success', "Productor agricola eliminado correctamente!");
      }
      else{
        this.$emit('event-action-error', getError(this.error));
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
