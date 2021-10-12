<template>
  <v-col cols="6" class="pa-0">
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
      <span class="mt-3 text-h6"> Ingrese su DNI para restablecer su contraseña</span>
    </v-row>
    <v-form
      ref="formRegister"
      v-model="isFormValid"
    >
      <v-row align="center" justify="center">
        <v-text-field outlined class="mt-16 shrink" label="Ingrese su DNI" :rules="loginUsernameValidation" v-model="username"></v-text-field>
      </v-row>
    </v-form>


    <v-row align="center" justify="center">
      <v-btn color="green lighten-2" class="white--text mt-4" @click="sendMailPassword" :disabled="!isFormValid">
        RESTABLECER CONTRASEÑA
      </v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn color="green lighten-2" class="white--text mt-16" outlined @click="returnLogin">
        VOLVER A INICIO DE SESIÓN
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
import {loginUsernameRules} from "@/helpers/validation";
import {mapActions} from "vuex";

export default {
  name: "ResetearCredenciales",
  data(){
    return{
      username:'',
      isFormValid: false,
      loginUsernameValidation: loginUsernameRules,
    }
  },
  methods:{
    ...mapActions({
      sendMail:'login/login/sendMailPassword',
    }),
    async sendMailPassword(){
      const payload = {};
      payload.dni = this.username;
      this.$emit('event-reset-password');
      await this.sendMail({payload:payload});
    },

    returnLogin(){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/deep/ .v-text-field{
  width: 500px;
}
</style>
