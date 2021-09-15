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
import AccionCorrecta from "@/components/AccionCorrecta";

export default {
  name: "EliminarProducto",
  components:{
    "mensaje-confirmacion":MensajeConfirmacion,
    "accion-correcta":AccionCorrecta,
  },
  data(){
    return{
      messageConfirm:'¿Está seguro de eliminar el producto?'
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
      deleteProduct: 'productos/products/deleteProduct',
      getProducts: 'productos/products/getProducts',
    }),
    async getPaginatedProducts(){
      await this.getProducts({communityId:1});
    },

    //Handlers
    handlePendingConfirm(value){
      this.$emit('event-delete',false);
      if (value){
        this.save();
      }
    },
    async save () {
      await this.deleteProduct({productId:this.editedItem.productId});
      await this.getPaginatedProducts();
      this.$emit('event-action-success', "Producto eliminado correctamente!");
    },
  },
  computed:{
    ...mapState({
      products: state => state.productos.products.products,
    }),
  }
}
</script>

<style scoped>

</style>
