<template>
  <v-container>
    <v-row justify="center">
      <v-form
        ref="formRegister"
        v-model="isFormValid"
      >
        <v-card
          elevation="2"
          outlined
          color="#f1f1f1"
          class="rounded-card mt-3"
        >
          <v-card-text>
            <v-row>
              <v-col class="text-right">
                <div class="general primary-color mt-5 mb-0">ELEGIR PRODUCTO:</div>
              </v-col>
              <v-col>
                <v-select
                  :rules="budgetProductValidation"
                  item-value="productId"
                  item-text="productName"
                  v-model="itemId"
                  :items="allProducts"
                >

                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col class="text-right">
                <div class="general primary-color mt-5 mb-0">CANTIDAD DE HECTAREAS A CULTIVAR:</div>
              </v-col>
              <v-col>
                <v-text-field
                  outlined
                  :rules="budgetCantValidation"
                  v-model="hectares"
                  background-color="white"
                  class="shrink prueba mr-16"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card-text>
          <v-row align="center" justify="center" class="mt-2">
            <v-btn color="green lighten-2" class="white--text" :disabled="!isFormValid" @click="getBudgetData">
              GENERAR PRESUPUESTO
            </v-btn>
          </v-row>
        </v-card-text>
      </v-form>
    </v-row>
    <v-row>
      <v-col>
        <tabla-insumos
          :rows="budget"
          :total="total"
          :loading="loading"
        />
      </v-col>
      <progress-loading
        :loading="progressLoading"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="white--text" color="green lighten-2" :disabled="!showButton" @click="exportBudget" >EXPORTAR PRESUPUESTO A PDF</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {budgetCantRules, budgetProductRules} from "@/helpers/validation";
import TablaInsumos from "@/components/presupuesto/TablaInsumos";
import moment from "moment-timezone";
import ProgressLoading from "@/components/ProgressLoading";

export default {
  name: "Presupuesto",
  data(){
    return{
      isFormValid:false,
      itemId: null,
      progressLoading:false,
      hectares:'',
      budgetProductValidation:budgetProductRules,
      budgetCantValidation:budgetCantRules
    }
  },

  components:{
    "tabla-insumos":TablaInsumos,
    "progress-loading":ProgressLoading,
  },

  async created(){
    await this.clearTable();
  },

  async mounted(){
    await this.getAllProducts();
  },

  methods:{
    ...mapActions({
      getProducts: 'presupuesto/budget/getProducts',
      getBudget: 'presupuesto/budget/generateBudget',
      clearTable: 'presupuesto/budget/clearTable',
    }),

    async getAllProducts(){
      await this.getProducts({communityId:1});
    },

    async generateBudget(){
      await this.getBudget({productId:this.itemId, hectares:this.hectares});
    },

    async getBudgetData(){
      await this.generateBudget();
    },

    exportBudget(){
      this.progressLoading = true;
      const url = `http://localhost:8080/supply_formula/reports/`+this.itemId;
      this.$axios({
        url: url,
        method: 'GET',
        params:{
          hectares: this.hectares
        },
        responseType: 'blob',
      }).then(response => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        const reportName = 'PresupuestoDeCompra'.concat(moment().tz('America/Lima').format().slice(0, 10));
        fileLink.href = fileURL;
        fileLink.setAttribute('download', `${reportName}.pdf`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
      this.progressLoading = false;
    }
  },

  computed:{
    ...mapState({
      allProducts: state => state.presupuesto.budget.products,
      budget: state => state.presupuesto.budget.budget,
      loading: state => state.presupuesto.budget.loading,
      total: state => state.presupuesto.budget.totalBudget,
    }),

    showButton:{
      get(){
        return this.budget.length !== 0;

      }
    }
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
</style>
