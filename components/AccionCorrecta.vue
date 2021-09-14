<template>
  <v-dialog v-model="dialogSuccess" @keydown.esc="close" persistent max-width="500px">
    <v-card class="d-flex flex-column" height="300px" width="800px">
      <v-row no-gutters align="center" justify="center">
        <v-img
          :src = "require(`@/static/check-logo.jpg`)"
          max-width="225px"
          max-height="169px"
        >
        </v-img>
      </v-row>
      <v-row  no-gutters align="center" justify="center">
        <v-card-title class="text-h6; justify-center">{{message}}</v-card-title>
      </v-row>
      <v-row  no-gutters>
        <v-col align="center">
          <v-btn depressed color="success" @click="close">ACEPTAR</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AccionCorrecta",

  props:{
    message:{
      type:String,
      default:'',
    },
    dialogSuccess:{
      type:Boolean,
      default: false,
    },
  },
  methods:{
    close(){
      this.$emit('event-success', false);
    }
  }
}
</script>

<style scoped>

</style>
