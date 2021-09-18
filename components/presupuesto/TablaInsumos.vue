<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    :loading="loading"
    loading-text="Cargando... Espere por favor"
  >
    <template #item.subtotal="{ item }">
      {{formatNumber(item.subtotal)}}
    </template>

    <template v-slot:body.append>
      <tr>
        <td></td>
        <td><td>
          <span>COSTO TOTAL DE LA COMPRA: {{formatNumber(total)}}</span>
        </td>
        <td colspan="4"></td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import {formatNumber} from "@/helpers/format";

export default {
  name: "TablaInsumos",
  data(){
    return{
      headers:[
        {
          text: 'Insumo',
          align: 'start',
          filterable: true,
          sortable: false,
          value: 'supplyName',
        },
        { text: 'Cantidad necesaria', value: 'totalCant' , filterable: false, align: "center"},
        { text: 'Unidad métrica', value: 'metricType' , filterable: false},
        { text: 'Precio unitario', value: 'unitPricing', filterable: false },
        { text: 'Subtotal', value: 'subtotal', filterable: false },
      ],
    }
  },

  props:{
    rows:{
      type:Array,
      default:[],
    },
    total:{
      type:Number,
      default:0,
    },
    loading:{
      type:Boolean,
      default:false,
    },
  },

  methods:{
    formatNumber,
  }
}
</script>

<style scoped>

</style>
