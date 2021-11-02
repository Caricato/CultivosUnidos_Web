<template>
  <div>
    <v-select label="Seleccione un año" v-model="activePicker" v-on:change="saveYear" :items="years">

    </v-select>
  </div>
</template>

<script>
export default {
  name: "YearPicker",
  data: () => ({
    activePicker: new Date().getFullYear(),
    date: null,
    menu: false,
  }),
  methods:{
    saveYear(){
      this.$emit('event-change-year', this.activePicker);
    },
  },
  computed:{
    years:{
      get(){
        const actualYear = new Date().getFullYear();
        const yearsAux = [];
        for (let i = actualYear+1; i > 2015; i--){
          yearsAux.push(i);
        }
        return yearsAux;
      }
    }
  }
}
</script>

<style scoped>

</style>
