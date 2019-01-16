<template>
  <div id='manage-bracket-page'>
    <edit-bracket v-if='initialGames' v-model='winnerOfGames' :intialGames='initialGames'>
      <div class='edit-bracket-inputs'>
        <errors :responseError='responseError' class="field errors" />
        <div class="field has-addons">
          <div class="control">
            <input class="input is-large" type="text" placeholder="Bracket Name" v-model='name'>
          </div>
          <div class="control">
            <button class='button is-primary is-large' @click='saveBracket'>Save</button>
          </div>
        </div>
      </div>
    </edit-bracket>
  </div>
  <!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
import EditBracket from '@/components/edit-bracket.vue'
import Errors from '@/components/errors'
import {bracketApi, saveBracketApi} from '@/helpers/api.js'
import bracketOptions from '@/helpers/bracketOptions.js'

export default {
  name: 'ManageBracketPage',
  components: {
    EditBracket,
    Errors,
  },
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      initialGames: null,
      winnerOfGames: this.$route.params.games || {},
      responseError: null,
    }
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
    },
    manageBracket() {
      if (this.id) {
        return saveBracketApi.updateBracket(this.id, {
          name: this.name,
          games: this.winnerOfGames,
        })
      }
      return saveBracketApi.saveBracket({
        name: this.name,
        games: this.winnerOfGames,
      })
    },
    saveBracket() {
      this.responseError = null
      this.manageBracket().then(data => {
        this.id = data.id // while thisnt isnt need for update it is useful to have the same code
        this.$toasted.global.saved()
      }).catch((errors) => {
        this.responseError = errors
      })
    },
  },
  created() {
    this.getInitialBracket()
    if (this.id && !this.name) {
      // Then the page was loaded from a place apart from the brackets page
      saveBracketApi.savedBracket(this.id).then((data) => {
        this.name = data.name
        this.winnerOfGames = data.games
      })
    }
  }
}
</script>
<style>
.edit-bracket-inputs {
  margin: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.errors {
  width: 100%;
  text-align: center;
}
</style>
