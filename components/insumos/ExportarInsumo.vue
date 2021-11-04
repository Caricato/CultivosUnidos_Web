<template>
  <v-btn
    color="success"
    dark
    class="ml-10 ma-15"
    @click="exportPDF"
  >
    EXPORTAR PDF
  </v-btn>
</template>

<script>
import {mapActions, mapState} from "vuex";
import moment from 'moment-timezone';

export default {
  name: "ExportarInsumo",
  props:{
    search:{
      type:String,
      value: ''
    }
  },
  methods:{
    ...mapActions({
        exportSupplies: 'insumos/supply/exportSupplies',
      }
    ),
    exportPDF(){
      const url = `http://3.229.64.153:8080/supplies/reports/1`;
      this.$axios({
        url: url,
        method: 'GET',
        params:{
          search: this.search
        },
        responseType: 'blob',
      }).then(response => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        const reportName = 'ReporteDeInsumos'.concat(moment().tz('America/Lima').format().slice(0, 10));
        fileLink.href = fileURL;
        fileLink.setAttribute('download', `${reportName}.pdf`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
  },

  computed:{
    ...mapState({
      community: state => state.comunidad.community,
    }),
  },
}
</script>

<style scoped>

</style>
