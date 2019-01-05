<template>
  <match-up-template :topWinner='topWinner' :bottomWinner='bottomWinner'>
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
    <template slot='top-team-name'>
        {{topTeam.rank}} {{topTeam.short_name}}
    </template>
    <template slot='top-team-score'>
        {{topTeam.score}}
    </template>
    <template slot='bottom-team-name'>
      {{bottomTeam.rank}} {{bottomTeam.short_name}}
    </template>
    <template slot='bottom-team-score'>
      {{bottomTeam.score}}
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
import MatchUpTemplate from '@/components/bracket/match-up-template.vue'

export default {
  name: 'MatchUp',
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
      return {
        score: this.game.top_team_score,
        rank: this.game.top_tournament_team && this.game.top_tournament_team.rank,
        short_name: this.game.top_tournament_team && this.game.top_tournament_team.team && this.game.top_tournament_team.team.short_name,
        name: this.game.top_tournament_team && this.game.top_tournament_team.team && this.game.top_tournament_team.team.name,
      }
    },
    bottomTeam() {
      return {
        score: this.game.bottom_team_score,
        rank: this.game.bottom_tournament_team && this.game.bottom_tournament_team.rank,
        short_name: this.game.bottom_tournament_team && this.game.bottom_tournament_team.team && this.game.bottom_tournament_team.team.short_name,
        name: this.game.bottom_tournament_team && this.game.bottom_tournament_team.team && this.game.bottom_tournament_team.team.name,
      }
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
