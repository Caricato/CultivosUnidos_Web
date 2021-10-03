<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    hide-default-footer
    fixed-header
    :items-per-page="12"
    height="400px"
  >
    <template v-slot:item.month="{ item, index }">
      <span>{{item.month}}</span>
    </template>
    <template v-slot:item.unitPricing="{ item, index }">
      <v-text-field
        outlined
        dense
        v-model="item.unitPricing"
        :rules="productUnitPricingValidation"
        class="shrink prueba mt-5"
        v-on:change="updateUnitPricing()"
      >
      </v-text-field>
    </template>
  </v-data-table>
</template>

<script>
import {productUnitPricingRules} from "@/helpers/validation";
import {mapState} from "vuex";

export default {
  name: "TablaPrecios",
  data(){
    return{
      headers: [
        {
          text: 'Mes',
          align: 'start',
          filterable: true,
          sortable: false,
          value: 'month',
        },
        { text: 'Precio por saco', value: 'unitPricing' , filterable: false},
      ],
      months:[
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SETIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",
      ],
      rows:[],
      productUnitPricingValidation:productUnitPricingRules
    }
  },

  mounted() {
    console.log("HOLAAA");
    this.rows = Object.assign([], this.prices);
    console.log(this.rows);
    if (this.rows.length === 0){
      this.months.forEach(x => {
        const newRow = {};
        newRow.month = x;
        newRow.unitPricing = '';
        this.rows.push(newRow);
      })
    }
  },
  methods:{
    updateUnitPricing(){
      this.$emit('event-prices-product', this.rows);
    }
  },

  computed:{
    ...mapState({
      prices: state => state.productos.products.prices,
    })
  }
}
</script>

<style scoped>
.prueba{
  width: 400px;
  height: 70px;
}
</style>
