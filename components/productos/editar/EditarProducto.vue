<template>
  <v-container>
    <v-row>
      <v-card-subtitle>
        EDITAR DATOS GENERALES DEL PRODUCTO
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
                  v-model="editItem.productName"
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
                  v-model="editItem.sacks"
                  :disabled="true"
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
                  v-model="editItem.relationSacks"
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
        EDITAR INSUMOS PARA SU PRODUCCIÓN
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-formula
          :isEditable="isEditable"
          :loading="loadingSupplies"
          @event-edit-supplies="handlerEditSupplies"
          @event-product-formula="handlerFillSupplies"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-7"></v-divider>
    </v-row>
    <v-row>
      <v-card-subtitle>
        INGRESAR PRECIOS MENSUALES POR SACO
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-precios
          @event-prices-product="handleProductPrices"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-7"></v-divider>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="mr-4 mt-4" depressed color="error"  @click="close">CANCELAR</v-btn>
      <v-btn class="ml-4 mt-4" depressed color="success" :disabled="checkData" @click="savePendingConfirm">ACEPTAR</v-btn>
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
import {productNameRules, productSacksRules, productStockRules} from "@/helpers/validation";
import {mapActions, mapState} from "vuex";
import TablaFormula from "@/components/productos/nuevo/TablaFormula";
import TablaPrecios from "@/components/productos/nuevo/TablaPrecios";

export default {
  name: "EditarProducto",
  components:{
    "tabla-formula":TablaFormula,
    "tabla-precios":TablaPrecios
  },
  data(){
    return{
      isFormValid:false,
      isEditable:false,
      productNameValidation:productNameRules,
      productStockValidation:productStockRules,
      productSacksValidation:productSacksRules,
      productPriceToRegisters:[],
      pricesAux:[],
      pricesValidation: true,
      dialogConfirm:false,
      cantValidation:false,
      messageConfirm:'¿Está seguro de actualizar el producto?',
      dialogSuccess:false,
      messageSuccess: 'Producto actualizado correctamente!',
    }
  },
  props:{
    defaultItem:{
      type:Object,
      default: null,
    }
  },

  async mounted(){
    await this.getProductById();
  },
  methods:{
    ...mapActions({
      getProduct: 'productos/products/getProduct',
      editProduct: 'productos/products/editProduct',
    }),

    async editProductAndSupplies(product, supplies){
      await this.editProduct({productId: this.$route.params.id, productToEdit:product,
        suppliesFormulas:supplies, productPriceToRegisters:this.productPriceToRegisters});
    },

    async getProductById(){
      await this.getProduct({productId:this.$route.params.id});
    },

    savePendingConfirm(){
      this.dialogConfirm = true;
    },

    async save(){
      const product = {};
      product.productName = this.editItem.productName;
      product.relationSacks = this.editItem.relationSacks;
      product.sacks = this.editItem.sacks;
      if (this.supplies === null || this.supplies === undefined) this.supplies = this.supplyFormula;
      await this.editProductAndSupplies(product, this.supplies);
      this.dialogSuccess = true;
    },

    close(){
      this.$router.push('/productos')
    },

    //handlers
    handlePendingConfirm(value){
      this.dialogConfirm = false;
      if(value) this.save();
    },

    handleSuccess(input){
      this.$router.push('/productos');
      this.dialogSuccess = false;
    },

    handlerEditSupplies(){
      this.isEditable = true;
    },
    handlerFillSupplies(input){
      this.supplies = input;
      this.cantValidation = this.supplies.length === 0;
      this.supplies.forEach(x =>{
        this.checkCants(x);
      })
    },

    handleProductPrices(input){
      this.productPriceToRegisters = input;
      this.pricesValidation = false;
      this.productPriceToRegisters.forEach(x =>{
        this.checkPrices(x);
      })
    },

    checkCants(input){
      const checkEmpty = ''.localeCompare(input.cantForHectare) === 0;
      if (input.supplyId === undefined ||input.cantForHectare === null || !Number.isInteger(Number(input.cantForHectare)) || checkEmpty){
        this.cantValidation = true;
      }
    },
    checkPrices(input){
      const checkEmpty = ''.localeCompare(input.unitPricing) === 0;
      if (input.unitPricing === null || !Number.isInteger(Number(input.unitPricing)) || checkEmpty){
        this.pricesValidation = true;
      }
    },
  },
  computed:{
    ...mapState({
      editedItem: state => state.productos.products.editedItem,
      supplyFormula: state => state.productos.products.supplyFormula,
      prices: state => state.productos.products.prices,
      loadingSupplies: state => state.productos.products.loadingSupplies,
    }),
    editItem:{
      get(){
        this.auxEdit = Object.assign({}, this.editedItem);
        return this.auxEdit;
      },
      set(v){
        this.auxEdit = v
      },
    },
    checkData() {
      console.log(this.cantValidation);
      return !this.isFormValid || this.cantValidation;
    },
  }
}
</script>

<style scoped>
.prueba{
  width: 400px;
  height: 70px;
}
</style>
