<template>
  <v-container>
    <v-row>
      <v-col>
        <search-bar @event-1 = "handleEvent1" :rules="searchRules" :label="labelSearch"/>
      </v-col>
      <v-col class="text-right">
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          @click="saveItem()"
        >
          ASOCIAR A NUEVO PRODUCTOR AGRÍCOLA
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-productores/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import TablaProductores from "@/components/productores/TablaProductores";

export default {
  name: "Productores",
  components:{
    'search-bar':SearchBar,
    'tabla-productores':TablaProductores,
  },
  data(){
    return{
      search:'',
      labelSearch:"Buscar por nombre, apellidos, DNI o correo electrónico",
      searchRules:[(v) => (v.length <=50)|| "El campo de busqueda no puede superar los 50 caractéres"],
    }
  },
  methods:{
    //handlers
    handleEvent1(input) {
      this.search = input;
    },
  }
}
</script>

<style scoped>

</style>
