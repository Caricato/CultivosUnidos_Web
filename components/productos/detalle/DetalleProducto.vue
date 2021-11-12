<template>
  <v-container>
    <v-row>
      <v-card-subtitle>
        DATOS GENERALES DEL PRODUCTO
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
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col>
                <div class="general primary-color mt-5 mb-0">NOMBRE DEL PRODUCTO: {{editItem.productName}}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="general primary-color mt-5 mb-0">CANTIDAD ACTUAL DEL PRODUCTO (EN SACOS): {{editItem.sacks}}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="general primary-color mt-2 mb-0">RELACIÓN SACOS PRODUCIDOS POR HECTAREA CULTIVADA: {{editItem.relationSacks}}</div>
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
        INSUMOS PARA SU PRODUCCIÓN
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-formula
          :loading="loadingSupplies"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-7"></v-divider>
    </v-row>
    <v-row>
      <v-card-subtitle>
        PRECIOS MENSUALES POR SACO
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-precios/>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        color="success"
        dark
        outlined
        class="ma-0"
        @click="$router.go(-1)"
      >
        ATRAS
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import TablaPrecios from "@/components/productos/detalle/TablaPrecios";
import TablaFormula from "@/components/productos/detalle/TablaFormula";

export default {
  name: "DetalleProducto",
  components:{
    "tabla-formula":TablaFormula,
    "tabla-precios":TablaPrecios
  },
  data(){
    return{
      isFormValid:false,
      isEditable:false,
      productPriceToRegisters:[],
      pricesAux:[],
      pricesValidation: true,
      dialogConfirm:false,
      cantValidation:false,
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
    }),

    async getProductById(){
      await this.getProduct({productId:this.$route.params.id});
    },

    handleProductPrices(input){
      this.productPriceToRegisters = input;
      this.pricesValidation = false;
      this.productPriceToRegisters.forEach(x =>{
        this.checkPrices(x);
      })
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
  }
}
</script>

<style scoped>
.prueba{
  width: 400px;
  height: 70px;
}
</style>
