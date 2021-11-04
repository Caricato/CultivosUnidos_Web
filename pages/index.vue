<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center mt-10">
        <v-img class="mt-2"
               :src = "require(`@/static/system-logo.png`)"
               contain
               height="270px"
               width="250px"
        >
        </v-img>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Bienvenido {{this.roleName}} {{this.userAuth.userName}}
        </v-card-title>
        <v-card-text>
          <p>Usted se encuentra en la página principal del Sistema Agrícola de la comunidad {{this.userAuth.communityName}}.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-spacer />
          <v-btn
            class="white--text"
            color="green lighten-2"
            to="/cronogramas"
          >
            VER CRONOGRAMAS ACTIVOS
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from "vuex";

export default{
  computed: {
    ...mapState({
      userAuth: state => state.login.login.userAuth,
      role: state => state.login.login.role,
    }),
    roleName:{
      get(){
        if (this.role === "PRODUCER") return "Productor Agrícola";
        else if (this.role === "SUPERVISOR") return "Supervisor";
      }
    }
  },
}
</script>
