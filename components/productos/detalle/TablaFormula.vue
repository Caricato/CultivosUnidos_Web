<template>
<v-data-table
  :headers="headers"
  :items="rowsOriginal"
  :items-per-page="5"
  :loading="loading"
  loading-text="Cargando... Espere por favor"
>
  <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-toolbar-title>Formula del Producto</v-toolbar-title>
    </v-toolbar>
  </template>
</v-data-table>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {entriesCantRules} from "@/helpers/validation";

export default {
  name: "TablaFormula",
  data(){
    return{
      headers: [
        {
          text: "Insumo",
          value: "supplyName",
          sortable: false,
          width: "500px",
        },
        {
          text: "Cantidad para una hectárea",
          value: "cantForHectare"
        },
        {
          text: "Unidad de Medida",
          value: "supplyMetricType",
          align: "center"
        },
      ],
      suppliesToSelect: [],
      rows: [],
      entriesCantValidation: entriesCantRules,
    }
  },
  props:{
    loading:{
      type:Boolean,
      default:false,
    }
  },
  computed:{
    ...mapState({
      rowsOriginal: state => state.productos.products.supplyFormula,
    }),
  }
}
</script>

<style scoped>
</style>
