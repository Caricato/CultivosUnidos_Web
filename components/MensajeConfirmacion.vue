<template>
  <v-dialog v-model="dialogConfirm" @keydown.esc="cancelValidate" persistent max-width="500px">
    <v-card class="d-flex flex-column" height="250px">
      <v-spacer></v-spacer>
      <v-card-title class="text-h6; justify-center">{{ message }}</v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="error" @click="cancelValidate">CANCELAR</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed color="success" @click="confirmValidate">ACEPTAR</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-spacer></v-spacer>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MensajeConfirmacion",
  props:{
    dialogConfirm:{
      type:Boolean, default:false
    },
    message:{
      type:String, default:''
    }
  },
  methods:{
    cancelValidate() {
      this.$emit('event-validate', false);
    },

    confirmValidate(){
      this.$emit('event-validate', true);
    }
  },
}
</script>

<style scoped>

</style>
