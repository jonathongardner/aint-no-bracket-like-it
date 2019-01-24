<template>
  <match-up-template @click="$emit('click')">
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
      <div class='team-info' :class="{'winner':topWinner}">
        <div>
          {{topTeam.rank}} {{topTeam.shortName}}
        </div>
        <div>
          {{topTeam.score}}
        </div>
      </div>
      <div class='team-info' :class="{'winner':bottomWinner}">
        <div>
          {{bottomTeam.rank}} {{bottomTeam.shortName}}
        </div>
        <div>
          {{bottomTeam.score}}
        </div>
      </div>
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
  name: 'match-up',
  components: {
    MatchUpTemplate,
  },
  props: {
    game: {
      type: Object,
      required: false,
      default() {
        return {
        }
      }
    },
  },
  computed: {
    topTeam() {
      return this.game.top || {}
    },
    bottomTeam() {
      return this.game.bottom || {}
    },
    topWinner() {
      return this.game.winner === 'top'
    },
    bottomWinner() {
      return this.game.winner === 'bottom'
    },
    winner() {
      return this.game.winner
    }
  }
}
</script>

<style scoped lang="scss">
</style>
