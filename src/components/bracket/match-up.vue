<template>
  <div class="match-up">
    <div class='top-bar'>
      <div>
        Date
      </div>
      <div>
        Game
      </div>
      <div>
        Region
      </div>
    </div>
    <div class='top-team' :class="{'winner':topWinner}">
      <div class='team-name'>
        {{topTeam.rank}} {{topTeam.short_name}}
      </div>
      <div class='team-score'>
        {{topTeam.score}}
      </div>
    </div>
    <div class='bottom-team' :class="{'winner':bottomWinner}">
      <div class='team-name'>
        {{bottomTeam.rank}} {{bottomTeam.short_name}}
      </div>
      <div class='team-score'>
        {{bottomTeam.score}}
      </div>
    </div>
  </div>
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
export default {
  name: 'MatchUp',
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
.match-up {
  font-size: 12px;
  text-align: center;
  margin: 5px;
  border: 1px black solid;
  display: grid;
  // grid-template-columns: auto;
  grid-template-rows: 25px 30px 30px;
  background: #ffffff;
  width: 160px;
  .top-bar {
    padding: 2px;
    display: flex;
    flex: row;
    justify-content: space-between;
    flex-wrap: no-wrap;
    border-bottom: 1px black solid;
  }
  .bottom-team, .top-team {
    display: grid;
    grid-template-columns: auto 30px;
    div {
      white-space: nowrap;
      align-self: center;
    }
  }
  .winner {
    font-weight: bold;
  }
}
</style>
