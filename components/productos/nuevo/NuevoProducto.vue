<template>
  <v-container>
    <v-row>
      <v-card-subtitle>
        INGRESAR DATOS GENERALES DEL PRODUCTO
      </v-card-subtitle>
    </v-row>
    <v-row justify="center">
      <v-form
        ref="formRegister"
        v-model="isFormValid"
      >
          <v-card
            elevation="2"
            outlined
            color="#f1f1f1"
            width="70%"
            class="rounded-card"
          >
            <v-card-text>
              <v-row>
                <v-col class="text-right">
                  <div class="general primary-color mt-5 mb-0">NOMBRE DEL PRODUCTO:</div>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="productName"
                    :rules="productNameValidation"
                    background-color="white"
                    class="shrink prueba mr-16"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col class="text-right">
                  <div class="general primary-color mt-5 mb-0">CANTIDAD ACTUAL DEL PRODUCTO (EN SACOS):</div>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    background-color="white"
                    v-model="stock"
                    :rules="productStockValidation"
                    class="shrink prueba mr-16"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col class="text-right">
                  <div class="general primary-color mt-2 mb-0">RELACIÓN SACOS PRODUCIDOS POR HECTAREA CULTIVADA:</div>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="sacks"
                    :rules="productSacksValidation"
                    background-color="white"
                    class="shrink prueba mr-16"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
      </v-form>
    </v-row>
    <v-row>
      <v-divider class="mt-7"></v-divider>
    </v-row>
    <v-row>
      <v-card-subtitle>
        INGRESAR INSUMOS PARA SU PRODUCCIÓN
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-formula @event-product-formula="handlerFillSupplies"/>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
        <v-btn class="mr-4" depressed color="error"  @click="close">CANCELAR</v-btn>
        <v-btn class="ml-4" depressed color="success" :disabled="checkData" @click="savePendingConfirm">ACEPTAR</v-btn>
    </v-row>
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
  </v-container>
</template>

<script>
import TablaFormula from "@/components/productos/nuevo/TablaFormula";
import {
  productNameRules,
  productStockRules,
  productSacksRules
} from "@/helpers/validation";
import moment from "moment-timezone";
import {mapActions} from "vuex";
export default {
  name: "NuevoProducto",
  data(){
    return{
      productName: '',
      stock: null,
      sacks: null,
      suppliesFormulas:[],
      isFormValid:false,
      cantValidation:true,
      productNameValidation:productNameRules,
      productStockValidation:productStockRules,
      productSacksValidation:productSacksRules,
      dialogConfirm:false,
      messageConfirm:'¿Está seguro de registrar el producto?',
      dialogSuccess:false,
      messageSuccess: 'Producto registrado correctamente!',
    }
  },
  components:{
    "tabla-formula":TablaFormula,
  },
  computed:{
    checkData(){
      return !this.isFormValid || this.cantValidation;
    },
  },
  methods:{
    ...mapActions({
      registerProduct:'productos/products/registerProduct'
    }),

    async registerNewProduct(product, supplies){
      await this.registerProduct({productToRegister:product,
        suppliesFormulas:supplies})
    },

    savePendingConfirm(){
      this.dialogConfirm = true;
    },
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if(value) this.save();
    },

    handlerFillSupplies(input){
      this.supplies = input;
      this.cantValidation = this.supplies.length === 0;
      this.supplies.forEach(x =>{
        this.checkCants(x);
      })
    },

    checkCants(input){
      const checkEmpty = ''.localeCompare(input.cantForHectare) === 0;
      if (input.supplyId === undefined ||input.cantForHectare === null || !Number.isInteger(Number(input.cantForHectare)) || checkEmpty){
        this.cantValidation = true;
      }
    },

    handleSuccess(input){
      this.$router.push('/productos');
      this.dialogSuccess = false;
    },
    async save(){
      const product = {};
      product.communityId = 1;
      product.productName = this.productName;
      product.stock = this.stock;
      product.sacks = this.sacks;
      await this.registerNewProduct(product, this.supplies);
      this.dialogSuccess = true;
    },
    close(){
      this.$router.push('/productos')
    },
  }
}
</script>

<style scoped>
.primary-color{
  color: #535B6C
}
div.general{
  font-size: 15px;
}
.prueba{
  width: 400px;
  height: 70px;
}
</style>
