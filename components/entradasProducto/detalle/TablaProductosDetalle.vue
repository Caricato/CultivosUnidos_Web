<template>
<v-data-table
  :headers="headers"
  :items="items"
  :loading="loadChild"
  loading-text="Cargando... Espere por favor"
>
  <template v-slot:item.metricType="{ item, index }">
    <span>SACOS</span>
  </template>
</v-data-table>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "TablaProductosDetalle",
  props:{
    items:{
      type: Array,
      default: [],
    },
    loading:{
      type: Boolean,
      default:false,
    }
  },
  data(){
    return{
      headers:[
        {
          text: "Producto",
          value: "product.productName",
          sortable: false,
          width: "500px",
        },
        {
          text: "Cantidad ingresada",
          value: "entryCant"
        },
        {
          text: "Unidad de medida",
          value: "metricType",
          align: "center"
        },
      ],
    }
  },

  computed:{
    ...mapState({
      detail: state => state.entradas.entry.detail,
    }),
    loadChild:{
      get(){
        return this.loading
      },
      set(){
        return !this.loading
      },
    }
  },
}
</script>

<style scoped>

</style>
