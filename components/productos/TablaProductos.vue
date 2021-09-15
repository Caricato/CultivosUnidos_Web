<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor"
    :search="search"
  >

  </v-data-table>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "TablaProductos",
  data(){
    return{
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          filterable: true,
          sortable: true,
          value: 'productName',
        },
        { text: 'Cantidad', value: 'stock' , filterable: false},
        { text: 'Sacos por hectárea', value: 'sacks', filterable:false },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    }
  },
  props:{
    search:{
      type:String,
      default: '',
    }
  },

  async created(){
    await this.getPaginatedProducts();
  },

  methods:{
    ...mapActions({
      getProducts:'productos/products/getProducts',
    }),

    async getPaginatedProducts(){
      await this.getProducts({communityId:1});
      console.log(this.products);
    },
  },

  computed:{
    ...mapState({
      loading: state => state.productos.products.loading,
      products: state => state.productos.products.products,
    }),
  },
}
</script>

<style scoped>

</style>
