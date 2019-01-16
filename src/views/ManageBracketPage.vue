<template>
  <div id='manage-bracket-page'>
    <edit-bracket v-if='initialGames' v-model='winnerOfGames' :intialGames='initialGames'>
      <div class='edit-bracket-inputs'>
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
import {bracketApi} from '@/helpers/api.js'
import {saveBracketApi} from '@/helpers/authenticatedApi.js'
import bracketOptions from '@/helpers/bracketOptions.js'

export default {
  name: 'ManageBracketPage',
  components: {
    EditBracket
  },
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      initialGames: null,
      winnerOfGames: this.$route.params.games || {},
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
    saveBracket() {
      if (this.id) {
        saveBracketApi.updateBracket(this.id, {
          name: this.name,
          games: this.winnerOfGames,
        }).then(() => {
          console.log('Updated Bracket')
        })
      } else {
        saveBracketApi.saveBracket({
          name: this.name,
          games: this.winnerOfGames,
        }).then(data => {
          this.id = data.id
        })
      }
    },
  },
  created() {
    this.getInitialBracket()
  }
}
</script>
<style>
.edit-bracket-inputs {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>
