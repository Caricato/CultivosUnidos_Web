<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700px"
      @keydown.esc="close"
    >
      <v-card>
        <v-card-title class ="text-h6; justify-center">
          <span class="text-h6">ASOCIAR NUEVO PRODUCTOR AGRÍCOLA</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="formRegister"
              v-model="isFormValid"
            >
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>DNI</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.dni"
                    outlined
                    class="v-text-field mt-4"
                    :rules = producerDNIValidation
                    label="Ingresar nombre"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>NOMBRES</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.producerName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    :rules = producerNameValidation
                    label="Ingresar nombre"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>PRIMER APELLIDO</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.producerFirstLastName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    :rules = producerFirstLastNameValidation
                    label="Ingresar primer apellido"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>SEGUNDO APELLIDO</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.producerSecondLastName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    :rules = producerSecondLastNameValidation
                    label="Ingresar segundo apellido"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>CORREO ELECTRÓNICO</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.email"
                    outlined
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    :rules = emailValidation
                    label="Ingresar direccion"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>TELEFONO CELULAR</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.phone"
                    outlined
                    :rules = phoneValidation
                    label="Ingresar número celular"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>DIRECCIÓN</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.address"
                    outlined
                    oninput="if(Number(this.value.length) > Number(200)) this.value = this.value.substring(0,200);"
                    :rules = addressValidation
                    label="Ingresar direccion"
                    class="shrink mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h6 primary-color"><br/>HECTAREAS</div>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="defaultItem.hectares"
                    :rules="hectaresValidation"
                    outlined
                    label="Ingresar hectareas"
                    class="shrink  mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-card-actions>
              <v-row class="ml-15 mt-2">
                <v-col class="ml-15">
                  <v-btn depressed color="error"  @click="close">CANCELAR</v-btn>
                </v-col>
                <v-col>
                  <v-btn depressed color="success" :disabled="!isFormValid" @click="savePendingConfirm">ACEPTAR</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <mensaje-confirmacion
      :dialog-confirm="dialogConfirm"
      :message="messageConfirm"
      @event-validate="handlePendingConfirm"
    />
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {
  loginUsernameRules,
  hectaresRules,
  emailRules,
  producerSecondLastNameRules,
  producerFirstLastNameRules, producerNameRules, addressRules, phoneRules
} from "@/helpers/validation";
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import {getError} from "@/helpers/error";

export default {
  name: "AgregarProductor",
  data: () => ({
    producerDNIValidation:loginUsernameRules,
    producerNameValidation:producerNameRules,
    producerFirstLastNameValidation:producerFirstLastNameRules,
    producerSecondLastNameValidation:producerSecondLastNameRules,
    phoneValidation:phoneRules,
    hectaresValidation:hectaresRules,
    addressValidation:addressRules,
    emailValidation:emailRules,
    dialogConfirm:false,
    isFormValid:false,
    messageConfirm:'¿Está seguro de asociar al productor?'
  }),
  components:{
    "mensaje-confirmacion":MensajeConfirmacion,
  },
  props:{
    dialog:{
      type:Boolean,
      default:false,
    },
    defaultItem:{
      type:Object,
      default: null,
    }
  },

  computed:{
    ...mapState({
      error: state => state.productores.producers.error,
    })
  },

  methods:{
    ...mapActions({
        registerProducer: 'productores/producers/registerProducer',
        getProducers:'productores/producers/getProducers',
        cleanError: 'productores/producers/cleanError',
      }
    ),

    async registerNewProducer(producer){
      await this.registerProducer(producer);
    },

    async getPaginatedProducers(){
      await this.getProducers({communityId:1});
    },

    async savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save(){
      this.defaultItem.communityId = 1;
      await this.registerNewProducer({producer:this.defaultItem});
      if (this.error === null){
        await this.getPaginatedProducers();
        this.closeSuccess();
      }
      else{
        this.closeNotSuccess();
        await this.cleanError();
      }
    },
    close () {
      this.cleanForms();
      this.$emit('event-register', false);
    },
    closeSuccess () {
      this.cleanForms();
      this.$emit('event-register', false);
      this.$emit('event-action-success', "Productor agrícola asociado exitosamente!");
    },

    closeNotSuccess(){
      this.cleanForms();
      this.$emit('event-register', false);
      this.$emit('event-action-error', getError(this.error));
    },

    cleanForms(){
      this.$refs.formRegister.reset();
    },

    //Handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if (value){
        this.save();
      }
    },
  }
}
</script>

<style scoped>
.v-text-field{
  height: 60px;
}
.v-col{
  height:20px;
}


.primary-color{
  color: #535B6C;
}
</style>
