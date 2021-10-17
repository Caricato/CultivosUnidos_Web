<template>
  <v-container>
    <v-row>
      <v-col></v-col>
      <v-col>
        <year-picker class="mt-4" @event-change-year="handleChangeYear"/>
      </v-col>
      <v-col>
        <v-btn
          color="green lighten-2"
          dark
          class="ma-6 mr-15"
          v-show="optionsForSupervisor === 'SUPERVISOR'"
          @click="saveItem()"
        >
          CREAR NUEVO CRONOGRAMA
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-cronogramas/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import YearPicker from "@/components/YearPicker";
import TablaCronogramas from "@/components/cronograma/TablaCronogramas";

export default {
  name: "Cronograma",
  components:{
    "year-picker":YearPicker,
    "tabla-cronogramas":TablaCronogramas,
  },
  methods:{
    //handlers
    handleChangeYear(){

    }
  },
  computed:{
    ...mapState({
      role: state => state.login.login.role,
    }),
    optionsForSupervisor:{
      get(){
        if (this.role === null || this.role === undefined) return '';
        return this.role;
      }
    }
  }
}
</script>

<style scoped>

</style>
