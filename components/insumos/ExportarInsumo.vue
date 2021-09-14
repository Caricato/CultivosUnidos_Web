<template>
  <v-btn
    color="success"
    dark
    outlined
    class="ml-10 ma-15"
    @click="exportPDF"
  >
    EXPORTAR PDF
  </v-btn>
</template>

<script>
import {mapActions, mapState} from "vuex";

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
      this.$axios({
        url: `http://localhost:8080/supplies/reports/1`,
        method: 'GET',
        params:{
          search: this.search
        },
        responseType: 'blob',
      }).then(response => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        const reportName = 'ReporteDeInsumos'.concat(new Date().toLocaleString());
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
