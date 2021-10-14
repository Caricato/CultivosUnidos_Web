<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    fixed-header
    hide-default-footer
    class="table"
  >
    <template v-slot:item.soldSacks="{ item, index }">
      <v-text-field
        outlined
        dense
        :rules="entriesCantValidation"
        v-model="item.soldSacks"
        class="shrink prueba"
        v-on:change="updateCant(item,index)"
      >
        mdi-delete
      </v-text-field>
    </template>
    <template v-slot:item.product="{ item, index }">
      <v-select
        :items="selectionTest"
        item-text="productName"
        item-value="productId"
        v-model="item"
        v-on:change="updateSupplyRow(item, index)"
        v-if="true"
      ></v-select>
      <span v-else>{{item.product}}</span>
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
  name: "TablaProductos",
  props:{
    editIsDisabled:{
      type:Boolean,
      default:true,
    },
    rowsAux:{
      type:Array,
      default:[],
    }
  },
  data(){
    return{
      headers: [
        {
          text: "Producto",
          value: "product",
          sortable: false,
          width: "500px",
        },
        {
          text: "Sacos a producir",
          value: "soldSacks",
          align: "center"
        },
        {
          text:"Sacos por hectarea",
          value:"relationSacks",
          align: "center"
        },
        { text: 'Eliminar', value: 'actions', sortable: false, align: "center" },
      ],

      productsToSelect: [],
      entriesCantValidation: entriesCantRules,
    }
  },

  async created() {
    await this.fillProducts();
    this.productsToSelect = this.products.map(a => Object.assign({}, a));
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
      newRow.soldSacks = null;
      this.rows.unshift(newRow);
      this.triggerFillProducts();
    },
    deleteSupplyRow(row){
      this.editedIndex = this.rows.indexOf(row);
      this.rows.splice(this.editedIndex, 1);
      this.triggerFillProducts();
    },
    updateSupplyRow(item, index){
      this.productsToSelect.forEach(x => {
        if (x.productId === item){
          this.rows.splice(index, 1);
          this.rows.splice(index, 0, Object.assign({}, {productId: x.productId, soldSacks:'', relationSacks: x.relationSacks}));
        }
      });
      this.triggerFillProducts();
    },
    updateCant(item, index){
      this.rows[index].soldSacks = item.soldSacks;
      this.triggerFillProducts();
    },

    triggerFillProducts(){
      console.log(this.rows);
      this.$emit('event-fill-products', this.rows);
    }
  },

  computed:{
    ...mapState({
      products: state => state.presupuesto.budget.products,
    }),

    rows:{
      get(){
        return this.rowsAux;
      }
    },

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
