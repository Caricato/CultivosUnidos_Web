<template>
  <v-container>
    <v-row>
      <v-col>
        <search-bar @event-1 = "handleEvent1" :rules="searchRules"/>
      </v-col>
      <v-col class="text-right">
        <v-btn
          color="success"
          dark
          class="ma-6 mr-15"
          @click="saveItem()"
        >
          AGREGAR
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-productos/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablaProductos from "@/components/productos/TablaProductos";
import SearchBar from "@/components/SearchBar";

export default {
  name: "Productos",
  data(){
    return{
      searchRules:[(v) => (v.length <=50)|| "El nombre del insumo solo puede ser 50 caracteres"],
    }
  },
  components:{
    "search-bar":SearchBar,
    "tabla-productos":TablaProductos,
  },
  methods:{
    saveItem(){

    },
    //handlers
    handleEvent1(input) {
      this.search = input;
    },
  },
}
</script>

<style scoped>

</style>
