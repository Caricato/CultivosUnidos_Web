<template>
  <v-container>
    <v-row>
      <v-card-subtitle>
        GESTIONAR PARAMETROS DE CRONOGRAMAS
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-parametros-cronograma :items="scheduleConfig" :loading="loading" @event-edit-parameter="handleEditParameter"/>
      </v-col>
    </v-row>
    <v-row>
      <v-card-subtitle>
        GESTIONAR UNIDADES MÉTRICAS
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-col>
        <tabla-unidades-metricas :items="unitMetrics" :loading="loading2"
                @event-edit-unit="handleEditUnit"
                @event-register-unit="handleRegisterUnit"
                @event-delete-unit="handleDeleteUnit"
        />
      </v-col>
    </v-row>
    <agregar-unidad-metrica
      :dialog="dialogRegisterUnit"
      :default-item="defaultUnitMetricItem"
      @event-register="handleConfirmRegisterEvent"
      @event-action-success="handleActionSuccess"
    />
    <editar-unidad-metrica
      :dialog='dialogEditUnit'
      :default-item='editedItem'
      @event-edit="handleConfirmEditEvent"
      @event-action-success="handleActionSuccess"
    />
    <eliminar-unidad-metrica
      :dialogConfirm='dialogDeleteUnit'
      :edited-item='editedItem'
      @event-delete="handleConfirmDeleteEvent"
      @event-action-success="handleActionSuccess"
      @event-action-error="handleActionError"
    />
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
import TablaUnidadesMetricas from "@/components/configuraciones/TablaUnidadesMetricas";
import AgregarUnidadMetrica from "@/components/configuraciones/AgregarUnidadMetrica";
import EditarUnidadMetrica from "@/components/configuraciones/EditarUnidadMetrica";
import EliminarUnidadMetrica from "@/components/configuraciones/EliminarUnidadMetrica";

export default {
  name: "Configuracion",
  data(){
    return{
      dialogSuccess: false,
      messageSuccess: 'Parametro actualizado con éxito!',
      dialogError: false,
      editItem:null,
      dialogEdit: false,
      dialogRegisterUnit:false,
      dialogEditUnit:false,
      dialogDeleteUnit:false,
      editedItem:{},
      defaultUnitMetricItem:{
        communityId: null,
        name: '',
      },
      messageError: 'Ocurrió un error al actualizar parámetro!',
    }
  },
  async mounted(){
    await this.getScheduleParameters({communityId:1})
    await this.getUnitMetrics({communityId:1})
  },
  components:{
    "tabla-parametros-cronograma":TablaParametrosCronograma,
    "tabla-unidades-metricas":TablaUnidadesMetricas,
    "editar-parametro":EditarParametro,
    "agregar-unidad-metrica":AgregarUnidadMetrica,
    "editar-unidad-metrica":EditarUnidadMetrica,
    "eliminar-unidad-metrica":EliminarUnidadMetrica,
  },
  methods:{
    ...mapActions({
      getScheduleParameters: 'configuraciones/configurations/getScheduleConfig',
      getUnitMetrics: 'insumos/supply/getUnitMetricTypes',
    }),
    handleConfirmDeleteEvent(input){
      this.dialogDeleteUnit = input;
    },
    handleEditOnClose(){
      this.dialogEdit = false;
    },
    handleSuccess(input){
      this.dialogSuccess = false;
      this.dialogError = false;
    },
    handleActionSuccess(input){
      this.messageSuccess = input;
      this.dialogSuccess = true;
    },
    handleActionError(input){
      this.messageError = input;
      this.dialogError = true;
    },
    handleConfirmRegisterEvent(input){
      this.dialogRegisterUnit = input;
    },
    handleEditParameter(item){
      this.editItem = item;
      this.dialogEdit = true;
    },
    handleRegisterAction(input){
      if (input) this.dialogSuccess = true;
      else this.dialogError = true;
    },
    handleRegisterUnit(){
      this.dialogRegisterUnit = true;
    },
    handleEditUnit(item){
      this.dialogEditUnit = true;
      this.editedItem = Object.assign({}, item);
    },
    handleDeleteUnit(item){
      this.dialogDeleteUnit = true;
      this.editedItem = Object.assign({}, item);
    },
    handleConfirmEditEvent(input){
      this.dialogEditUnit = input;
    },
  },
  computed:{
    ...mapState({
      scheduleConfig: state => state.configuraciones.configurations.scheduleConfig,
      loading: state => state.configuraciones.configurations.loading,
      loading2: state => state.insumos.supply.loading2,
      unitMetrics: state => state.insumos.supply.metricTypes,
    })
  }
}
</script>

<style scoped>

</style>
