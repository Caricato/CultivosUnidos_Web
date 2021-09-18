<template>
  <v-dialog
    v-model="loading"
  >
    <v-progress-circular
      :size="70"
      :width="7"
      color="green lighten-2"
      indeterminate
    ></v-progress-circular>
  </v-dialog>
</template>

<script>
export default {
  name: "ProgressLoading",
  props:{
    loading:{
      type:Boolean,
      default:false,
    }
  }
}
</script>

<style scoped>

</style>
