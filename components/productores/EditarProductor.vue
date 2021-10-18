<template>
  <v-container>
    <v-dialog
      v-model="dialogEdit"
      persistent
      max-width="700px"
      @keydown.esc="close"
    >
      <v-card>
        <v-card-title class ="text-h6; justify-center">
          <span class="text-h6">EDITAR PRODUCTOR AGRÍCOLA</span>
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
                    v-model="editedItem.dni"
                    outlined
                    class="v-text-field mt-4"
                    disabled
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
                    v-model="editedItem.producerName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    disabled
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
                    v-model="editedItem.producerFirstLastName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    disabled
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
                    v-model="editedItem.producerSecondLastName"
                    outlined
                    class="v-text-field mt-4"
                    oninput="if(Number(this.value.length) > Number(100)) this.value = this.value.substring(0,100);"
                    disabled
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
                    v-model="editedItem.email"
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
                    v-model="editedItem.phone"
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
                    v-model="editedItem.address"
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
                    v-model="editedItem.hectares"
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
import {
  addressRules, emailRules,
  hectaresRules, phoneRules,
} from "@/helpers/validation";
import MensajeConfirmacion from "@/components/MensajeConfirmacion";
import {mapActions, mapState} from "vuex";

export default {
  name: "EditarProductor",
  data: () => ({
    hectaresValidation:hectaresRules,
    addressValidation:addressRules,
    emailValidation:emailRules,
    phoneValidation:phoneRules,
    dialogConfirm:false,
    isFormValid:false,
    editedItem:{},
    messageConfirm:'¿Está seguro de actualizar los datos del productor?'
  }),
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
  components:{
    "mensaje-confirmacion":MensajeConfirmacion,
  },

  async mounted() {
    await this.getAllProducers();
  },

  methods:{
    ...mapActions({
      editProducer: 'productores/producers/editProducer',
      getProducers:'productores/producers/getProducers',
    }),
    async getAllProducers(){
      await this.getProducers({communityId:1});
    },

    async updateProducer(producer){
      await this.editProducer(producer);
    },

    async savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save () {
      await this.updateProducer({producer:this.editedItem})
      await this.getAllProducers();
      this.closeSuccess()
    },

    close () {
      this.edit = Object.assign({}, this.defaultItem);
      this.$emit('event-edit', false);
    },
    closeSuccess () {
      this.$emit('event-edit', false);
      this.$emit('event-action-success', "Insumo actualizado exitosamente!");
    },

    //handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      this.$emit('event-edit-pending',false);
      if (value){
        this.save();
      }
    },
  },

  computed:{
    ...mapState({
      producers:state => state.productores.producers.producers,
    }),
    rules() {
      const valid = Number(this.editItem.stock) < Number(this.editItem.stockMin);
      return{
        second: [() => !valid || "No debe ser mayor a la cantidad"],
      };
    },

    editItem:{
      get(){
        this.editedItem = Object.assign({}, this.defaultItem);
        return this.editedItem;
      },
      set(v){
        this.editedItem = v
      },
    },
    dialogEdit:{
      get(){
        this.editedItem = Object.assign({}, this.defaultItem);
        return this.dialog;
      }
    }
  },
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
