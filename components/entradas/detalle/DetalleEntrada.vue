<template>
  <v-container class="mt-2">
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" align="center">FECHA DE FLUJO:</div>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" v-if="entryDate !== null">
                  <p>{{formatDateTimeToLocal(entryDate)}}</p>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center">
                <div class="text-h6 primary-color mr-8 mb-0" align="center">TIPO ASOCIADO:</div>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 primary-color mr-8 mb-0" v-if="entryType !== null">
                  <p>{{entryType}}</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-insumos-detalle class="mt-2"
          :items="items"
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-row align="center"
           justify="center">
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
import TablaInsumosDetalle from "@/components/entradas/detalle/TablaInsumosDetalle";
import {mapActions, mapState} from "vuex";
import {formatDateTimeToLocal} from '~/helpers/format';

export default {
  name: "DetalleEntrada",
  data(){
    return{
      items:[],
      loading: true,
      entryDate: null,
      entryType: null,
    }
  },
  components:{
    'tabla-insumos-detalle':TablaInsumosDetalle,
  },
  async created(){
    await this.getEntryDetail();
    this.items = this.detail.data.detailPage.data;
    this.loading = false;
    this.entryDate = this.detail.data.merchandiseFlow.entryDate;
    this.entryType = this.detail.data.merchandiseFlow.entryType;
  },

  methods:{
    ...mapActions({
      getDetail: 'entradas/entry/getEntryDetails',
    }),

    async getEntryDetail(){
      await this.getDetail({merchandiseEntryId:this.$route.params.id});
    },
    formatDateTimeToLocal,
  },
  computed:{
    ...mapState({
      detail: state => state.entradas.entry.detail,
    }),
  }
}
</script>

<style scoped>

</style>
