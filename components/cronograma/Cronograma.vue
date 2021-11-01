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
        <tabla-cronogramas :schedules="schedules" :loading="loading"/>
      </v-col>
    </v-row>
    <nuevo-cronograma
      :dialog='dialogSave'
      :default-item='defaultItem'
      @event-register="handleConfirmRegisterEvent"
      @event-action-success="handleRegisterAction"
    />

    <accion-correcta :dialog-success="dialogSuccess" :message="messageSuccess" @event-success="handleSuccess"/>
    <accion-error :dialog-error="dialogError" :message="messageError" @event-success="handleSuccess"/>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";
import YearPicker from "@/components/YearPicker";
import TablaCronogramas from "@/components/cronograma/TablaCronogramas";
import NuevoCronograma from "@/components/cronograma/NuevoCronograma";
import AccionCorrecta from "@/components/AccionCorrecta";
import AccionError from "@/components/AccionError";

export default {
  name: "Cronograma",
  data(){
    return{
      dialogSave:false,
      defaultItem: {
        productId: '',
        startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        product: 'SELECCIONAR',
        cantProducers: null,
        hectares: null,
      },
      dialogSuccess: false,
      messageSuccess: '',
      dialogError: false,
      messageError: '',
    }
  },
  components:{
    "year-picker":YearPicker,
    "tabla-cronogramas":TablaCronogramas,
    "nuevo-cronograma":NuevoCronograma,
    "accion-correcta":AccionCorrecta,
    "accion-error":AccionError,
  },
  methods:{
    ...mapActions({
      getSchedules: 'cronogramas/schedule/getSchedules',
    }),
    saveItem(){
      this.dialogSave = true;
    },
    async getAllSchedules(){
      await this.getSchedules({communityId:1});
    },
    //handlers
    handleChangeYear(){

    },
    handleConfirmRegisterEvent(input){
      this.dialogSave = input;
    },

    handleRegisterAction(input){
      if (input) this.handleActionSuccess("Cronograma generado exitosamente!");
      else this.handleActionError("Ocurrio un error al generar cronograma!");
    },
    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
    handleActionError(input){
      this.messageError = input;
      this.dialogError = true;
    },
    handleSuccess(input){
      this.dialogSuccess = false;
      this.dialogError = false;
    },
  },
  async mounted() {
    await this.getAllSchedules();
  },
  computed:{
    ...mapState({
      role: state => state.login.login.role,
      schedules: state => state.cronogramas.schedule.schedules,
      loading: state => state.cronogramas.schedule.loading,
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
