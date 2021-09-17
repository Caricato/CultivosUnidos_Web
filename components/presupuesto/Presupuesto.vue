<template>
  <v-row justify="center">
    <v-form
      ref="formRegister"
      v-model="isFormValid"
    >
      <v-card
        elevation="2"
        outlined
        color="#f1f1f1"
        class="rounded-card"
      >
        <v-card-text>
          <v-row>
            <v-col class="text-right">
              <div class="general primary-color mt-5 mb-0">ELEGIR PRODUCTO:</div>
            </v-col>
            <v-col>
              <v-select>

              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col class="text-right">
              <div class="general primary-color mt-5 mb-0">CANTIDAD DE HECTAREAS A CULTIVAR:</div>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                background-color="white"
                class="shrink prueba mr-16"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-row>
</template>

<script>
export default {
  name: "Presupuesto",
  data(){
    return{

    }
  },
}
</script>

<style scoped>
.primary-color{
  color: #535B6C
}
div.general{
  font-size: 15px;
}
</style>
