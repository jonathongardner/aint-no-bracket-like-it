<template>
  <div id='manage-bracket-page'>
    <edit-bracket v-if='initialGames' :value='winnerOfGames' :intialGames='initialGames'
      :gameAvailability='gameAvailability' @input='updateWinnerOfGame'>
      <div class='edit-bracket-inputs'>
        <errors :responseError='responseError' class="field errors" />
        <div class="field has-addons">
          <div class="control">
            <input class="input is-large" type="text" placeholder="Bracket Name" v-model='name'>
          </div>
          <div class="control">
            <button class='button is-primary is-large' @click='saveBracket'>Save</button>
          </div>
          <div class="control">
            <button class='button is-success is-large' @click='submitBracket'
              :disabled='cantSubmit' :title="submitTitle">
              Submit
            </button>
          </div>
        </div>
        <div class='field'>
        </div>
      </div>
    </edit-bracket>
  </div>
  <!-- class="subtitle is-3 has-text-centered" -->
</template>

<script>
import EditBracket from '@/components/edit-bracket.vue'
import Errors from '@/components/errors'
import {bracketApi, uniqueBracketApi, saveBracketApi} from '@/helpers/api.js'
import bracketOptions from '@/helpers/bracketOptions.js'

export default {
  name: 'ManageBracketPage',
  components: {
    EditBracket,
    Errors,
  },
  data() {
    return {
      id: null,
      name: null,
      initialGames: null,
      winnerOfGames: {},
      isUnique: false,
      responseError: null,
      gameAvailability: {},
    }
  },
  computed: {
    yearToShow() {
      return bracketOptions.lastYear
    },
    cantSubmit() {
      return !this.gameAvailability.finished || !this.gameAvailability.unique || this.isUnique
    },
    submitTitle() {
      if (!this.gameAvailability.finished && !this.gameAvailability.unique) {
        return 'All games must be picked and unique to submit.'
      }
      if (!this.gameAvailability.finished) {
        return 'All games must be picked to submit.'
      }
      if (!this.gameAvailability.unique) {
        return 'Bracket must be unique to submit.'
      }
      if (this.isUnique) {
        return 'Bracket has already been submitted as unique.'
      }
      return ''
    },
  },
  methods: {
    updateWinnerOfGame(games) {
      if (!this.isUnique) {
        this.winnerOfGames = games
      } else {
        this.$toasted.show("Can only change unique bracket name.", {type: 'error', icon: 'exclamation'})
      }
    },
    getInitialBracket() {
      bracketApi.getInitialBracket(this.yearToShow).then(data => {
        this.initialGames = data
      })
    },
    manageBracket(unique) {
      const params = {name: this.name, games: this.winnerOfGames}
      if(unique) {
        params.is_unique = true
      }

      if (this.id) {
        return saveBracketApi.updateBracket(this.id, params)
      }
      return saveBracketApi.createBracket(params)
    },
    saveBracket(unique = false) {
      this.responseError = null
      this.manageBracket(unique).then(data => {
        this.id = data.id // while thisnt isnt need for update it is useful to have the same code
        this.$toasted.global.saved()
      }).catch((errors) => {
        this.responseError = errors
      })
    },
    submitBracket() {
      this.saveBracket(true)
    },
    getGameAvailability() {
      uniqueBracketApi.getGameAvailability(this.winnerOfGames).then(data => {
        this.gameAvailability = data
      }).catch(() => {
        this.gameAvailability = {}
      })
    },
    initialize(route) {
      if (route.params.id) {
        this.id = route.params.id
        const f = (data) => {
          this.name = data.name
          this.winnerOfGames = data.games
          this.isUnique = data.isUnique
        }
        if (route.params.bracket) {
          f(route.params.bracket)
        } else {
          // Then the page was loaded from a place apart from the brackets page
          saveBracketApi.savedBracket(this.id).then(f)
        }
      } else {
        this.getGameAvailability()
      }
    },
  },
  watch: {
    winnerOfGames() {
      this.getGameAvailability()
    }
  },
  created() {
    this.getInitialBracket()
    this.initialize(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.initialize(to)
    next()
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
