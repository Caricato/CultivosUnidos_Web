<template>
  <v-container>
    <v-row>
      <v-card-subtitle>
        EDITAR PARAMETROS DE CRONOGRAMAS
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-parametros-cronograma :items="scheduleConfig" :loading="loading" @event-edit-parameter="handleEditParameter"/>
      </v-col>
    </v-row>
    <editar-parametro :dialog="dialogEdit" :default-item="editItem" @event-register="handleEditOnClose"
                      @event-action-success="handleRegisterAction"/>
    <accion-correcta :dialog-success="dialogSuccess" :message="messageSuccess" @event-success="handleSuccess"/>
    <accion-error :dialog-error="dialogError" :message="messageError" @event-success="handleSuccess"/>
  </v-container>
</template>

<script>
import TablaParametrosCronograma from "@/components/configuraciones/TablaParametrosCronograma";
import {mapActions, mapState} from "vuex";
import EditarParametro from "@/components/configuraciones/EditarParametro";

export default {
  name: "Configuracion",
  data(){
    return{
      dialogSuccess: false,
      messageSuccess: 'Parametro actualizado con éxito!',
      dialogError: false,
      editItem:null,
      dialogEdit: false,
      messageError: 'Ocurrió un error al actualizar parámetro!',
    }
  },
  async mounted(){
    await this.getScheduleParameters({communityId:1})
  },
  components:{
    "tabla-parametros-cronograma":TablaParametrosCronograma,
    "editar-parametro":EditarParametro,
  },
  methods:{
    ...mapActions({
      getScheduleParameters: 'configuraciones/configurations/getScheduleConfig',
    }),
    handleEditOnClose(){
      this.dialogEdit = false;
    },
    handleSuccess(input){
      this.dialogSuccess = false;
      this.dialogError = false;
    },

    handleEditParameter(item){
      this.editItem = item;
      this.dialogEdit = true;
    },
    handleRegisterAction(input){
      if (input) this.dialogSuccess = true;
      else this.dialogError = true;
    },
  },
  computed:{
    ...mapState({
      scheduleConfig: state => state.configuraciones.configurations.scheduleConfig,
      loading: state => state.configuraciones.configurations.loading,
    })
  }
}
</script>

<style scoped>

</style>
