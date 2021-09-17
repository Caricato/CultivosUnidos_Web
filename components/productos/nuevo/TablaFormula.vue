<template>
<v-data-table
  :headers="headers"
  :items="rows"
  hide-default-footer
  :loading="loading"
  loading-text="Cargando... Espere por favor"
  class="table"
>
  <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-toolbar-title>Formula del Producto</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn
          color="green lighten-2"
          dark
          class="mb-2"
          v-show="!isEditable"
          @click="editSupplies"
        >
          EDITAR
        </v-btn>
    </v-toolbar>
  </template>
  <template v-slot:item.cantForHectare="{ item, index }">
    <v-text-field
      outlined
      dense
      id="idCant"
      :rules="entriesCantValidation"
      v-model="item.cantForHectare"
      class="shrink prueba mt-1"
      :disabled="!isEditable"
      v-on:change="updateCant(item,index)"
    >
      mdi-delete
    </v-text-field>
  </template>
  <template v-slot:item.role="{ item, index }">
    <v-select
      :items="selectionTest"
      item-text="supplyName"
      item-value="supplyId"
      v-model="item"
      v-on:change="updateSupplyRow(item, index)"
      v-if="isEditable"
    ></v-select>
    <span v-else>{{item.supplyName}}</span>
  </template>
  <template v-slot:item.actions="{ item }">
    <v-icon
      small
      v-show="isEditable"
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
      v-show="isEditable"
      class="mb-2 ml-3"
      @click="addSupplyRow"
    >
      AGREGAR INSUMO
    </v-btn>
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
          value: "role",
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
        { text: 'Eliminar', value: 'actions', sortable: false, align: "center" },
      ],
      suppliesToSelect: [],
      rows: [],
      entriesCantValidation: entriesCantRules,
    }
  },
  props:{
    isEditable:{
      type:Boolean,
      default: true,
    },
    loading:{
      type:Boolean,
      default:false,
    }
  },
  async created() {
    await this.fillSupplies();
    if (!this.isEditable) this.rows = this.rowsOriginal;
    this.suppliesToSelect = this.suppliesSelection.map(a => Object.assign({}, a));
  },
  methods:{
    ...mapActions({
      getAllSupplies: 'insumos/supply/getAllSupplies',
    }),

    async fillSupplies(){
      await this.getAllSupplies({companyId:1});
    },
    addSupplyRow(){
      const newRow = Object.assign({}, {});
      newRow.cantForHectare = null;
      this.rows.unshift(newRow);
      this.triggerFillSupplies();
    },
    deleteSupplyRow(row){
      this.editedIndex = this.rows.indexOf(row);
      this.rows.splice(this.editedIndex, 1);
      this.triggerFillSupplies();
    },
    updateSupplyRow(item, index){
      this.suppliesToSelect.forEach(x => {
        if (x.supplyId === item){
          this.rows.splice(index, 1);
          this.rows.splice(index, 0, Object.assign({}, {...x, cantForHectare:''}));
        }
      });
      this.triggerFillSupplies();
    },

    editSupplies(){
      this.$emit('event-edit-supplies');
    },

    updateCant(item, index){
      this.rows[index].cantForHectare = item.cantForHectare;
      this.triggerFillSupplies();
    },

    triggerFillSupplies(){
      this.$emit('event-product-formula', this.rows);
    },
  },
  computed:{
    ...mapState({
      suppliesSelection: state => state.insumos.supply.allSupplies,
      rowsOriginal: state => state.productos.products.supplyFormula,
    }),

    selectionTest:{
      get(){
        let rowsTest = [];
        this.suppliesToSelect.forEach(x=>{
          let isSelected = false;
          this.rows.forEach(y => {
            if ( x.supplyId === y.supplyId){
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
.table{
  max-height: calc(100vh - 300px);
}
.v-data-table {
  overflow: auto;
}
.v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}
</style>
