<template>
  <v-app>
    <v-row>
      <v-col cols="6" class="pa-0">
        <v-img
          :src = "require(`@/static/rice-background.jpg`)"
          width="100%"
          height="100%"
        >
        </v-img>
      </v-col>
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
          <span class="mt-3 mr-3 text-h4"> Inicia Sesión</span>
        </v-row><v-form
        ref="formRegister"
        v-model="isFormValid"
      >
        <v-row>
          <v-text-field outlined class="mr-16 ml-16 mt-7" label="Ingrese su DNI" :rules="loginUsernameValidation" v-model="username"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field outlined class="mr-16 ml-16" :type="checkPassword ? 'text': 'password'"
                        label="Ingrese su contraseña"  :append-icon="checkPassword ? visibility_off : visibility"
                        @click:append="() => (checkPassword = !checkPassword)"
                        v-model="password" :rules="loginPasswordValidation"></v-text-field>
        </v-row>
      </v-form>
        <v-row justify="end" class="mr-16">
          <v-btn text>¿Olvidaste tu contraseña?</v-btn>
        </v-row>
        <v-row justify="center">
          <span style="color: red" v-show ="showMessageError">{{ messageError }}</span>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn color="green lighten-2" class="white--text mt-4" @click="enterSession" :disabled="!isFormValid">
            INGRESAR
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {getError} from "@/helpers/error";
import {loginPasswordRules, loginUsernameRules} from "@/helpers/validation";

export default {
  name: "login",
  data(){
    return{
      username:'',
      password:'',
      checkPassword:false,
      visibility:'mdi-eye',
      visibility_off:'mdi-eye-off',
      messageError: '',
      showMessageError: false,
      isFormValid:false,
      loginUsernameValidation: loginUsernameRules,
      loginPasswordValidation: loginPasswordRules,
    }
  },
  methods:{
    ...mapActions({
      login:"login/login/login",
      cleanError:'login/login/cleanError',
    }),
    async enterSession(){
      const payload = {};
      payload.username = this.username;
      payload.password = this.password;
      await this.cleanError();
      await this.login({payload:payload});
      if (!(this.error === undefined || this.error === null)){
        this.messageError = getError(this.error);
        this.showMessageError = true;
      }
      else{
        this.showMessageError = false;
        await this.$router.push("/");
      }
    }
  },
  computed:{
    ...mapState({
      error: state => state.login.login.error,
    }),
  }
}
</script>

<style scoped>

</style>
