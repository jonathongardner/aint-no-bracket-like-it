<template>
  <div id='bracket-page'>
    <div v-if='toEarly' class='subtitle has-text-centered'>
      Sorry... I can't rembember that far back. Here's {{ yearToShow }}.
    </div>
    <div v-else-if='toLate' class='subtitle has-text-centered'>
      Woah!!!! You trying to get me to tell you the future... I don't think so. Here's {{ yearToShow }}.
    </div>
    <bracket :games='games'>
      <year-picker class="has-text-centered" :year='yearToShow' @change='getBracket'></year-picker>
    </bracket>
  </div>
  <!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
// @ is an alias to /src
import YearPicker from '@/components/year-picker.vue'
import Bracket from '@/components/bracket.vue'
import {bracketApi} from '@/helpers/api.js'
import bracketOptions from '@/helpers/bracketOptions.js'

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
  computed: {
    toEarly() {
      return bracketOptions.firstYear > this.$route.params.year
    },
    toLate() {
      return this.$route.params.year > bracketOptions.lastYear
    },
    yearToShow() {
      if (this.toEarly) {
        return bracketOptions.firstYear
      }
      if (this.toLate) {
        return bracketOptions.lastYear
      }
      return parseInt(this.$route.params.year, 10)
    },
  },
  methods: {
    getBracket() {
      bracketApi.getBracket(this.yearToShow).then(data => {
        this.games = data
      })
    }
  },
  created() {
    this.getBracket()
  }
}
</script>
<style>
#bracket-page {
  padding: 10px;
}
</style>
