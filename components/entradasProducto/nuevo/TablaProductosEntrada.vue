<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    fixed-header
    hide-default-footer
    class="table"
  >
    <template v-slot:item.entryCant="{ item, index }">
      <v-text-field
        outlined
        dense
        :rules="entriesCantValidation"
        v-model="item.entryCant"
        class="shrink prueba"
        v-on:change="updateCant(item,index)"
      >
        mdi-delete
      </v-text-field>
    </template>
    <template v-slot:item.role="{ item, index }">
      <v-select
        :items="selectionTest"
        item-text="productName"
        item-value="productId"
        v-model="item"
        v-on:change="updateSupplyRow(item, index)"
        v-if="true"
      ></v-select>
      <span v-else>{{item.role}}</span>
    </template>
    <template v-slot:item.metricType="{ item, index }">
      <span>SACOS</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="deleteSupplyRow(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:footer>
      <v-btn
        color="success"
        dark
        width="98%"
        class="mb-2 ml-3"
        @click="addSupplyRow"
      >
        AGREGAR PRODUCTO
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {entriesCantRules} from "@/helpers/validation";
import {mapActions, mapState} from "vuex";

export default {
  name: "TablaProductosEntrada",
  props:{
    editIsDisabled:{
      type:Boolean,
      default:true,
    }
  },
  data(){
    return{
      headers: [
        {
          text: "Producto",
          value: "role",
          sortable: false,
          width: "500px",
        },
        {
          text: "Cantidad",
          value: "entryCant"
        },
        {
          text:"Unidad de medida",
          value:"metricType",
          align: "center"
        },
        { text: 'Eliminar', value: 'actions', sortable: false, align: "center" },
      ],

      rows: [],
      productsToSelect: [],
      entriesCantValidation: entriesCantRules,
    }
  },

  async created() {
    await this.fillProducts();
    this.productsToSelect = this.products.map(a => Object.assign({}, a));
    console.log(this.productsToSelect);
  },

  methods:{
    ...mapActions({
      getAllProducts: 'presupuesto/budget/getProducts',
    }),

    async fillProducts(){
      await this.getAllProducts({communityId:1});
    },
    addSupplyRow(){
      const newRow = Object.assign({}, {});
      newRow.entryCant = null;
      this.rows.unshift(newRow);
      this.triggerFillSupplies();
    },
    deleteSupplyRow(row){
      this.editedIndex = this.rows.indexOf(row);
      this.rows.splice(this.editedIndex, 1);
      this.triggerFillSupplies();
    },
    updateSupplyRow(item, index){
      this.productsToSelect.forEach(x => {
        if (x.productId === item){
          this.rows.splice(index, 1);
          this.rows.splice(index, 0, Object.assign({}, {...x, entryCant:''}));
        }
      });
      this.triggerFillSupplies();
    },
    updateCant(item, index){
      this.rows[index].entryCant = item.entryCant;
      this.triggerFillSupplies();
    },

    triggerFillSupplies(){
      this.$emit('event-fill-supplies', this.rows);
    }
  },

  computed:{
    ...mapState({
      products: state => state.presupuesto.budget.products,
    }),

    selectionTest:{
      get(){
        let rowsTest = [];
        this.productsToSelect.forEach(x=>{
          let isSelected = false;
          this.rows.forEach(y => {
            if ( x.productId === y.productId){
              isSelected = true;
            }
          });
          rowsTest.push({...x, disabled: isSelected});
        })
        rowsTest.sort((r1, r2)=>{
          return r1.disabled - r2.disabled
        });
        return rowsTest;
      }
    }
  }
}
</script>

<style scoped>

</style>
