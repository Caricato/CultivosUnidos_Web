<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col>
                <v-row>
                  <v-col class="text-left">
                    <div class="text-h6 primary-color mt-2 ml-10 mb-0" >FECHA DE INICIO:</div>
                  </v-col>
                  <v-col class="text-left">
                    <div class="text-h6 primary-color mr-8 mt-2 mb-0" v-if="detail.startDate !== null">
                      <p>{{formatDateTimeToLocal(detail.startDate)}}</p>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-left">
                    <div class="text-h6 primary-color mt-2 ml-10 mb-0" >FECHA DE FIN:</div>
                  </v-col>
                  <v-col class="text-left">
                    <div class="text-h6 primary-color mr-8 mt-2 mb-0" v-if="detail.endDate !== null">
                      <p>{{formatDateTimeToLocal(detail.endDate)}}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mt-11" align="center">
                <v-chip>{{detail.state}}</v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tabla-detalle :details="scheduleDetails" :loading="loading"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          elevation="2"
          outlined
          class="rounded-card"
        >
          <v-card-text>
            <v-row>
              <v-col class="text-left">
                <div class="text-h6 primary-color mt-2 ml-10 mb-0" align="center">PRODUCTO A CULTIVAR:</div>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 primary-color mr-8 mt-2 mb-0" v-if="detail.productName !== null">
                  <p>{{detail.productName}}</p>
                </div>
              </v-col>
            </v-row>
              <v-row>
                <v-col class="text-left">
                  <div class="text-h6 primary-color mt-2 ml-10 mb-0" align="center">TOTAL DE HECTAREAS:</div>
                </v-col>
                <v-col class="text-left">
                  <div class="text-h6 primary-color mr-8 mt-2 mb-0" v-if="detail.hectares !== null">
                    <p>{{detail.hectares}} HECTAREAS</p>
                  </div>
                </v-col>
              </v-row>
          </v-card-text>
        </v-card>
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
import {mapActions, mapState} from "vuex";
import {formatDateTimeToLocal} from "@/helpers/format";
import TablaDetalle from "@/components/cronograma/detalle/TablaDetalle";

export default {
  name: "DetalleCronograma",

  components:{
    'tabla-detalle':TablaDetalle,
  },

  async mounted(){
    await this.getScheduleDetail();
  },
  methods:{
    ...mapActions({
      getDetail:'cronogramas/schedule/getScheduleDetail',
    }),

    async getScheduleDetail(){
      await this.getDetail({scheduleId:this.$route.params.id});
    },
    formatDateTimeToLocal,
  },

  computed:{
    ...mapState({
      detail:state => state.cronogramas.schedule.detail,
      scheduleDetails: state => state.cronogramas.schedule.scheduleDetails,
      loading:state => state.cronogramas.schedule.loading,
    }),
  }
}
</script>

<style scoped>
</style>
