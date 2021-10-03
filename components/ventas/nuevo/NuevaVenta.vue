<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>FECHA DE VENTA:</div>
              </v-col>
              <v-col align="center" class="mt-2">
                <menu-datepicker
                  :label="dateLabel"
                  @event-change-date="handlerChangeStartDate"
                >
                </menu-datepicker>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-row align="center"
             justify="center" class="mt-3">
        <v-col class="text-right">
          <v-btn depressed color="error"  @click="$router.go(-1)">CANCELAR</v-btn>
        </v-col>
        <v-col>
          <v-btn depressed color="success" >ACEPTAR</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-container>
</template>

<script>
import MenuDatePicker from "@/components/MenuDatePicker";

export default {
  name: "NuevaVenta",
  components:{
    "menu-datepicker":MenuDatePicker
  },
  data(){
    return{
      dateLabel:"Ingresa fecha de venta",
    }
  },
  methods:{
    //handlers
    handlerChangeStartDate(input){
      this.entryDate = input
    },
  }
}
</script>

<style scoped>

</style>
