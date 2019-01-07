<template>
  <match-up-template>
    <template slot='top-bar'>
      <div>
        Date
      </div>
      <div>
        Game
      </div>
      <div>
        Region
      </div>
    </template>
    <template slot='teams'>
      <label class='team' :class="{'winner':topWinner}">
        <template v-if="topTeam.hasOwnProperty('rank')">
          <div>
            {{topTeam.rank}} {{topTeam.shortName}}
          </div>
          <div>
            <input type="radio" value='top' v-model="winner">
          </div>
        </template>
      </label>
      <label class='team' :class="{'winner':bottomWinner}">
        <template v-if="bottomTeam.hasOwnProperty('rank')">
          <div>
            {{bottomTeam.rank}} {{bottomTeam.shortName}}
          </div>
          <div>
            <input type="radio" value='bottom' v-model="winner">
          </div>
        </template>
      </label>
    </template>
  </match-up-template>
</template>

<script>
/* game = {
  top_tournament_team: {
    team: {
      short_name: String!
      name: String!
    },
    rank: int!
  },
  top_team_score: int?,
  bottom_tournament_team: {
    team: {
      short_name: String!
      name: String!
    },
    rank: int!
  },
  bottom_team_score: int?
  winner: top|bottom|null
}*/
import MatchUpTemplate from '@/components/bracket/templates/match-up-template.vue'

export default {
  name: 'edit-match-up',
  components: {
    MatchUpTemplate,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    game: {
      type: Object,
      required: false,
      default() {
        return {
        }
      }
    },
  },
  data() {
    return {
      winner: this.value,
    }
  },
  computed: {
    topTeam() {
      return this.game.top || {}
    },
    bottomTeam() {
      return this.game.bottom || {}
    },
    topWinner() {
      return this.winner === 'top'
    },
    bottomWinner() {
      return this.winner === 'bottom'
    },
  },
  watch: {
    winner() {
      this.$emit('input', this.winner)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
