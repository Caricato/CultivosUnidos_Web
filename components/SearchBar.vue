<template>
  <v-text-field
    class="ma-5 mr-15"
    solo
    :label="label"
    prepend-inner-icon="mdi-magnify"
    v-model = "search"
    :rules = rules
    v-on:input="$emit('event-1', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: "SearchBar",
  data: () =>({
    search: ''
  }),
  props:{
    rules:{type:Array},
    label:{type:String},
  },
  emits:[
    'event-1',
  ],
}
</script>

<style scoped>

</style>
