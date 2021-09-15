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
        :items="suppliesToSelect"
        item-text="supplyName"
        item-value="supplyId"
        v-model="item"
        v-on:change="updateSupplyRow(item, index)"
        v-if="true"
      ></v-select>
      <span v-else>{{item.role}}</span>
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
        AGREGAR INSUMO
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {entriesCantRules} from "@/helpers/validation";

export default {
  name: "TablaInsumosEntrada",
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
          text: "Insumo",
          value: "role",
          sortable: false,
          width: "500px",
        },
        {
          text: "Cantidad",
          value: "entryCant"
        },
        {
          text: "Unidad de medida",
          value: "supplyMetricType",
          align: "center"
        },
        { text: 'Eliminar', value: 'actions', sortable: false, align: "center" },
      ],

      rows: [],
      suppliesToSelect: [],
      entriesCantValidation: entriesCantRules,
    }
  },

  async created() {
    await this.fillSupplies();
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
      const newRow = Object.assign({}, this.suppliesToSelect[0]);
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
      this.suppliesToSelect.forEach(x => {
        if (x.supplyId === item){
          this.rows.splice(index, 1);
          this.rows.splice(index, 0, Object.assign({}, x));
        }
      });
      this.updateCant(item, index);
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
      suppliesSelection: state => state.insumos.supply.allSupplies,
    }),
  }
}
</script>

<style scoped>
.prueba{
  width: 60px;
}

.table{
  max-height: calc(100vh - 300px);
}
.v-data-table {
  overflow: auto;
}
.v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}

.centered-input >>> input {
  text-align: center
}
</style>
