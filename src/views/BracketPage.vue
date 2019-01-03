<template>
  <div class="bracket">
    <year-picker class="has-text-centered" :year='$route.params.year'></year-picker>
  </div>
  <!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
// @ is an alias to /src
import YearPicker from '@/components/YearPicker.vue'

export default {
  name: 'BracketPage',
  components: {
    YearPicker
  },
  // created() {
  //   console.log(this.$route.name === 'bracket')
  // }
}
</script>
