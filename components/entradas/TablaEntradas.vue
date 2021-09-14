<template>
  <v-data-table
    :headers="headers"
    :items="entries"
    >
    <template #item.entryDate="{ item }">
      {{formatDateTimeToLocal(item.entryDate)}}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="success"
        dark
        outlined
        class="ma-0"
        @click="checkDetails(item)"
      >
        VER DETALLE
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {formatDateTimeToLocal} from '~/helpers/format';
export default {
  name: "TablaEntradas",
  data(){
    return{
      headers: [
        {
          text: 'Fecha de entrada',
          align: 'start',
          filterable: true,
          sortable: false,
          value: 'entryDate',
        },
        { text: 'Tipo', value: 'entryType' , filterable: false},
        { text: 'Detalle', value: 'actions', sortable: false, align: "center" },
      ],
    }
  },
  props:{
    entries:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default: false,
    },
  },
  methods:{
    formatDateTimeToLocal,
    checkDetails(item){
      //this.$router.push(`/entradas/detalle/${item.merchandiseEntryId}`);
    },
  },
}
</script>

<style scoped>

</style>
