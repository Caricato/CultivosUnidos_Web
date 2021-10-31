<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        v-bind:label="$t()"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      :min="nowDate"
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="saveDate(date)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment-timezone';
export default {
  name: "StartDatePicker",
  data(){
    return{
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      nowDate: moment().tz('America/Lima').format().slice(0, 10),
    }
  },

  props:{
    label:{
      type:String,
      default:'',
    }
  },
  methods:{
    saveDate(date){
      this.$refs.menu.save(date);
      this.$emit('event-change-date', date);
    },
    $t() {
      return this.label;
    },
    getDates(val){
      return this.availableDates.indexOf(val) !==-1;
    }
  },
}
</script>

<style scoped>

</style>
