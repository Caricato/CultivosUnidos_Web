<template>
  <v-data-table
    :headers="validateHeaders"
    :items="items"
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
import {mapState} from "vuex";

export default {
  name: "TablaProductores",
  props:{
    items:{
      type:Array,
      default:[],
    },
    loading:{
      type:Boolean,
      default:false
    },
    search:{
      type:String,
      default: '',
    }
  },
  data(){
    return{
      headersSupervisor: [
        {
          text: "Apellidos y Nombres",
          value: "fullName",
          sortable: true,
          width: "500px",
        },
        {
          text: "DNI",
          value: "dni"
        },
        {
          text: "Correo electrónico",
          value: "email",
          align: "center"
        },
        {
          text: "Teléfono celular",
          value: "phone",
          align: "center"
        },
        {
          text: "Dirección",
          value: "address",
          align: "center"
        },
        {
          text: "Hectáreas",
          value: "hectares",
          align: "center"
        },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      headersProducer: [
        {
          text: "Apellidos y Nombres",
          value: "fullName",
          sortable: true,
          width: "500px",
        },
        {
          text: "DNI",
          value: "dni"
        },
        {
          text: "Correo electrónico",
          value: "email",
          align: "center"
        },
        {
          text: "Dirección",
          value: "address",
          align: "center"
        },
        {
          text: "Hectáreas",
          value: "hectares",
          align: "center"
        },
      ],

      dialogDelete: false,
      dialogSuccess: false,
      messageSuccess: '',
    }
  },
  methods:{
    editItem (item) {
      this.$emit('event-edit-pending', item);
    },
    deleteItem (item) {
      this.$emit('event-delete-pending', item);
    },
    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
    handleSuccess(input){
      this.dialogSuccess = input
    }
  },
  computed:{
    ...mapState({
      role: state => state.login.login.role,
    }),
    validateHeaders:{
      get(){
        if (this.role === 'SUPERVISOR') return this.headersSupervisor;
        return this.headersProducer;
      }
    }
  }
}
</script>

<style scoped>

</style>
