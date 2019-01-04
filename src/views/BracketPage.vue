<template>
  <div>
    <year-picker class="has-text-centered" :year='$route.params.year' @change='getBracket'></year-picker>
    <bracket :games='games'></bracket>
  </div>
  <!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
// @ is an alias to /src
import YearPicker from '@/components/year-picker.vue'
import Bracket from '@/components/bracket.vue'
import {bracketApi} from '@/helpers/api.js'

export default {
  name: 'BracketPage',
  components: {
    YearPicker, Bracket
  },
  data() {
    return {
      games: {}
    }
  },
  watch: {
    '$route.params.year'() {
      this.getBracket()
    }
  },
  methods: {
    getBracket() {
      bracketApi.getBracket(this.$route.params.year).then(data => {
        this.games = data
      })
    }
  },
  created() {
    this.getBracket()
  }
}
</script>
