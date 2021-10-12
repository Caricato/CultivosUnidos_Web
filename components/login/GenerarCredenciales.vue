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
      <span class="mt-3 text-h6"> Ingrese su nueva contraseña</span>
    </v-row>
    <v-form
      ref="formRegister"
      v-model="isFormValid"
    >
      <v-row align="center" justify="center">
        <v-text-field outlined class="mt-16 shrink" label="Ingrese su nueva contraseña" :rules="loginPasswordValidation" v-model="username"
                      :type="checkPassword ? 'text': 'password'" :append-icon="checkPassword ? visibility_off : visibility"
                      @click:append="() => (checkPassword = !checkPassword)"></v-text-field>
      </v-row>
    </v-form>


    <v-row align="center" justify="center">
      <v-btn color="green lighten-2" class="white--text mt-4" @click="resetPassword" :disabled="!isFormValid">
        ACEPTAR
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
import {loginPasswordRules} from "@/helpers/validation";
import {mapActions} from "vuex";

export default {
  name: "GenerarCredenciales",
  data(){
    return{
      username:'',
      loginPasswordValidation:loginPasswordRules,
      isFormValid: false,
      checkPassword:false,
      visibility:'mdi-eye',
      visibility_off:'mdi-eye-off',
    }
  },
  methods:{
    ...mapActions({
      reset:'login/login/resetPassword',
    }),
    async resetPassword(){
      const payload = {};
      payload.password = this.username;
      payload.token = this.$route.params.id;
      this.$emit('event-reset-password');
      await this.reset({payload:payload});
    }
  }
}
</script>

<style scoped>
/deep/ .v-text-field{
  width: 500px;
}
</style>
