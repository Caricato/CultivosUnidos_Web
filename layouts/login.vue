<template>
  <v-app>
    <v-row>
      <v-col cols="6">
        <v-img
          :src = "require(`@/static/rice-background.jpg`)"
          width="100%"
          height="102%"
        >
        </v-img>
      </v-col>
      <v-col cols="6">
        <v-row align="center" justify="center">
            <v-img class="mt-12"
              :src = "require(`@/static/system-logo.png`)"
              contain
              height="270px"
              width="250px"
            >
            </v-img>
        </v-row>
        <v-row align="center" justify="center">
          <span class="mt-3 mr-3 text-h4"> Inicia Sesión</span>
        </v-row>
        <v-row>
          <v-text-field outlined class="mr-16 ml-16 mt-7" label="Ingrese su correo electrónico"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field outlined class="mr-16 ml-16" type="password" label="Ingrese su contraseña"></v-text-field>
        </v-row>
        <v-row justify="end" class="mr-16">
          <v-btn text>¿Olvidaste tu contraseña?</v-btn>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn color="green lighten-2" class="white--text mt-4" @click="enterSession">
            INGRESAR
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "login",
  methods:{
    enterSession(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>
