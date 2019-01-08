<!--
Use slots so it will be easier when user can edit Bracket
so data doesnt have to keep propagating up
-->
<template>
  <div class='is-light'>
    <slot />
    <bracket-template>
      <match-up v-for="(game, gameNumber) in games" :slot="'game' + gameNumber" :key='gameNumber'
        @click='gameClicked(gameNumber)' class='can-click' :game='game' />
    </bracket-template>
    <!-- Use v-if so modal resets after close -->
    <bracket-stats-modal v-if='showModal' :gameNumber='gameNumber' :year='year' @input='showModal = false'/>
  </div>
</template>

<script>
import BracketTemplate from '@/components/bracket/templates/bracket-template.vue'
import MatchUp from '@/components/bracket/match-up.vue'
import BracketStatsModal from '@/components/bracket/bracket-stats-modal.vue'

export default {
  name: 'bracket',
  components: {
    BracketTemplate,
    MatchUp,
    BracketStatsModal,
  },
  props: {
    games: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    year: {
      type: Number,
      required: false,
      default: -1,
    }
  },
  data() {
    return {
      gameNumber: 1,
      showModal: false,
    }
  },
  methods: {
    gameClicked(gameNumber) {
      this.gameNumber = parseInt(gameNumber, 10)
      this.showModal = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.can-click {
  cursor: pointer;
}
// .bracket {
//   background: #f2f2f2;
// }
</style>
