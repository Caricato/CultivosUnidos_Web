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
                <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>FECHA DE SALIDA DE INSUMOS:</div>
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
    <v-row>
      <v-col>
        <tabla-insumos-entrada @event-fill-supplies="handlerFillSupplies"/>
        <mensaje-confirmacion
          :dialog-confirm="dialogConfirm"
          :message="messageConfirm"
          @event-validate="handlePendingConfirm"
        >
        </mensaje-confirmacion>
        <accion-correcta
          :dialog-success= 'dialogSuccess'
          :message = 'messageSuccess'
          @event-success = "handleSuccess"
        ></accion-correcta>
        <accion-error
          :dialog-error="dialogError"
          :message="messageError"
          @event-success = "handleSuccessError"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row >
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mb-0" align="center"><br/>TIPO DE SALIDA DE INSUMOS</div>
              </v-col>
              <v-col align="center" class="mt-2">
                <v-select label="SELECCIONAR EL TIPO DE SALIDA" :items="entryTypes" item-value="value" item-text="text" v-model="select" :rules="flowTypeValidation" v-on:change="updateType">
                </v-select>
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
          <v-btn depressed color="success" :disabled="checkData" @click="savePendingConfirm">ACEPTAR</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-container>

</template>

<script>
import MenuDatePicker from "@/components/MenuDatePicker";
import TablaInsumosEntrada from "@/components/entradas/nuevo/TablaInsumosEntrada";
import AccionCorrecta from "@/components/AccionCorrecta";
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import {mapActions, mapState} from "vuex";
import moment from "moment-timezone";
import AccionError from "@/components/AccionError";
import {getError} from "@/helpers/error";
import {flowTypeRules} from "@/helpers/validation";

export default {
  name: "NuevaSalida",
  data(){
    return{
      entryDate: null,
      select: null,
      dateLabel:"Ingresa fecha de salida",
      dialogConfirm:false,
      messageConfirm:"¿Está seguro de realizar el registro?",
      dialogSuccess: false,
      messageSuccess:"SALIDA DE INSUMOS REGISTRADA!",
      dialogError: false,
      messageError: '',
      flowTypeValidation:flowTypeRules,
      cantValidation:true,
      entryTypes:[
        {
          value: "VENTA",
          text: "POR VENTA",
        },

        {
          value: "DESASOCIACION",
          text: "POR DESASOCIACION DE PRODUCTOR AGRÍCOLA",
        },
        {
          value: "CADUCADO",
          text: "POR MAL ESTADO DE LOS INSUMOS",
        },
      ],
      entries:[],
    }
  },
  async created() {
    await this.getEntryTypesToSelect();
  },
  components:{
    "menu-datepicker":MenuDatePicker,
    "tabla-insumos-entrada":TablaInsumosEntrada,
    "accion-correcta":AccionCorrecta,
    "mensaje-confirmacion":MensajeConfirmacion,
    "accion-error":AccionError,
  },
  methods:{
    ...mapActions({
      getEntryTypes:'entradas/entry/getEntryTypes',
      registerEntry:'entradas/entry/registerEntry',
    }),

    handlerChangeStartDate(input){
      this.entryDate = input
    },

    handlerFillSupplies(input){
      this.supplies = input;
      this.cantValidation = this.supplies.length === 0;
      this.supplies.forEach(x =>{
        this.checkCants(x);
      })
    },

    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if(value) this.save();
    },

    checkCants(input){
      if (input.entryCant === null)
        this.cantValidation = true;
    },

    updateType(item){
      this.$router.push({path: item.src});
    },

    async registerNewEntry(item){
      await this.registerEntry({
        communityId: this.community.community.communityId, detailsToRegister:item.detailsToRegister,
        entryDate: item.entryDate, entryType: item.entryType, subtype:"SALIDA_INSUMO", producerId:item.producerId
      });
    },

    handleSuccess(value){
      this.dialogSuccess = value;
      if(!this.dialogSuccess){
        this.$router.push('/salidas')
      }
    },
    handleSuccessError(){
      this.dialogError = false;
      this.$router.push('/salidas')
    },
    async getEntryTypesToSelect(){
      await this.getEntryTypes();
    },

    savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save(){
      const entryDTO = {};
      entryDTO.entryDate = (this.entryDate != null)? this.entryDate: moment().tz('America/Lima').format().slice(0, 10);
      entryDTO.entryType = this.select;
      entryDTO.detailsToRegister = this.supplies;
      entryDTO.producerId = 0;
      await this.registerNewEntry(entryDTO);
      if (this.error === null)
        this.dialogSuccess = true;
      else{
        this.dialogError = true;
        this.messageError = getError(this.error);
      }
    },
  },
  computed:{
    ...mapState({
      types: state => state.entradas.entry.types,
      community: state => state.comunidad.community,
      error: state => state.entradas.entry.error,
    }),

    checkData(){
      const checkSelect = this.select === null;
      return checkSelect || this.cantValidation;
    },
  },
}
</script>

<style scoped>
.primary-color{
  color: #535B6C;
}

.rounded-card{
  border-radius:50px;
}
</style>
