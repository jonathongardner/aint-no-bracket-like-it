<template>
  <match-up-template @top-bar-click="$emit('click')">
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
      <team-select class='team-info' :team='topTeam' :value='value' type='top' :available='topAvailable' @input='winner'/>
      <team-select class='team-info' :team='bottomTeam' :value='value' type='bottom' :available='bottomAvailable' @input='winner' />
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
import TeamSelect from '@/components/bracket/team-select.vue'

export default {
  name: 'edit-match-up',
  components: {
    MatchUpTemplate,
    TeamSelect,
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
    availability: {
      type: Array,
      required: true,
    }
  },
  computed: {
    topTeam() {
      return this.game.top || {}
    },
    bottomTeam() {
      return this.game.bottom || {}
    },
    topAvailable() {
      return this.availability.includes('top')
    },
    bottomAvailable() {
      return this.availability.includes('bottom')
    },
  },
  methods: {
    winner(winner) {
      this.$emit('input', winner)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
