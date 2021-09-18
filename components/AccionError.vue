<template>
  <v-dialog v-model="dialogError" @keydown.esc="close" persistent max-width="500px">
    <v-card class="d-flex flex-column" height="300px" width="800px">
      <v-row no-gutters align="center" justify="center">
        <v-img
          :src = "require(`@/static/error-logo.png`)"
          max-width="225px"
          max-height="169px"
        >
        </v-img>
      </v-row>
      <v-row  no-gutters align="center" justify="center">
          <span class="text-h6; text-center">{{message}}</span>
      </v-row>
      <v-row  no-gutters>
        <v-col align="center">
          <v-btn depressed color="error" @click="close">ACEPTAR</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AccionError",
  props:{
    message:{
      type:String,
      default:'',
    },
    dialogError:{
      type:Boolean,
      default:false,
    }
  },
  methods: {
    close() {
      this.$emit('event-success', false);
    }
  }
}
</script>

<style scoped>

</style>
