<template>
  <div id='create-bracket-page'>
    <edit-bracket v-if='initialGames' v-model='winnerOfGames' :intialGames='initialGames'>
    </edit-bracket>
  </div>
  <!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
import EditBracket from '@/components/edit-bracket.vue'
import {bracketApi} from '@/helpers/api.js'
import bracketOptions from '@/helpers/bracketOptions.js'

export default {
  name: 'CreateBracketPage',
  components: {
    EditBracket
  },
  data() {
    return {
      initialGames: null,
      winnerOfGames: {},
    }
  },
  watch: {
  },
  computed: {
    yearToShow() {
      return bracketOptions.lastYear
    },
  },
  methods: {
    getInitialBracket() {
      bracketApi.getInitialBracket(this.yearToShow).then(data => {
        this.initialGames = data
      })
    }
  },
  created() {
    this.getInitialBracket()
  }
}
</script>
<style>
#bracket-page {
  padding: 10px;
}
</style>
