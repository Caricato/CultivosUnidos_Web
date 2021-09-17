<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="loading"
    :items-per-page="5"
    loading-text="Cargando... Espere por favor"
    :search="search"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
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
        { text: 'Sacos Disponibles', value: 'stock' , filterable: false, align: "center"},
        { text: 'Relación Sacos por Hectárea', value: 'sacks', filterable:false, align: "center" },
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
      getProduct:'productos/products/getProduct',
    }),

    async getProductDetail(id){
      await this.getProduct({productId: id});
    },

    async editItem (item) {
      await this.getProductDetail(item.productId);
      await this.$router.push(`productos/editar/${item.productId}`);
    },

    deleteItem (item) {
      this.$emit('event-delete-pending', item);
    },

    async getPaginatedProducts(){
      await this.getProducts({communityId:1});
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
