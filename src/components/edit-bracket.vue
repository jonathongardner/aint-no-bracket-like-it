<!--
Use slots so it will be easier when user can edit Bracket
so data doesnt have to keep propagating up
-->
<template>
  <div class='is-light'>
    <slot />
    <bracket-template>
      <template v-for="(game, gameNumber) in games">
        <edit-match-up class='can-click' :slot="'game' + gameNumber" :game='game' :key='gameNumber'
          :value='getWinnerOfGame(gameNumber)' @input='updateWinnerOfGame(gameNumber, $event)'
          @click='gameClicked(gameNumber)' :availability='safeGameAvailability(gameNumber)'/>
      </template>
    </bracket-template>
    <!-- Use v-if so modal resets after close -->
    <bracket-stats-modal v-if='showModal' :gameNumber='gameNumber' @input='showModal = false'/>
  </div>
</template>

<script>
import BracketTemplate from '@/components/bracket/templates/bracket-template.vue'
import EditMatchUp from '@/components/bracket/edit-match-up.vue'
import BracketStatsModal from '@/components/bracket/bracket-stats-modal.vue'

export default {
  name: 'edit-bracket',
  components: {
    BracketTemplate,
    EditMatchUp,
    BracketStatsModal,
  },
  props: {
    intialGames: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    gameAvailability: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      previousGameMapping: {
        33: [1, 2],
        34: [3, 4],
        35: [5, 6],
        36: [7, 8],
        37: [9, 10],
        38: [11, 12],
        39: [13, 14],
        40: [15, 16],
        41: [18, 17],
        42: [20, 19],
        43: [22, 21],
        44: [24, 23],
        45: [26, 25],
        46: [28, 27],
        47: [30, 29],
        48: [32, 31],
        49: [33, 34],
        50: [35, 36],
        51: [37, 38],
        52: [39, 40],
        53: [42, 41],
        54: [44, 43],
        55: [46, 45],
        56: [48, 47],
        57: [49, 50],
        58: [51, 52],
        59: [54, 53],
        60: [56, 55],
        61: [57, 58],
        62: [60, 59],
        63: [61, 62],
      },
      gameNumber: 1, // for modal
      showModal: false,
    }
  },
  computed: {
    games() {
      const toReturn = Object.assign({}, this.intialGames)
      let gameNumber = 33
      while (gameNumber < 64) {
        const previousGames = this.previousGameMapping[gameNumber]
        toReturn[gameNumber] = {
          'top': Object.assign({}, (toReturn[previousGames[0]] || {})[this.getWinnerOfGame(previousGames[0])]),
          'bottom': Object.assign({}, (toReturn[previousGames[1]] || {})[this.getWinnerOfGame(previousGames[1])])
        }
        gameNumber++
      }
      return toReturn
    },
  },
  methods: {
    getWinnerOfGame(gameNumber) {
      return (this.value[gameNumber] && this.value[gameNumber].winner) || ''
    },
    updateWinnerOfGame(gameNumber, newValue) {
      // Do gameNumber last so it overwrites the value in value
      this.$emit('input', Object.assign({}, this.value, {[gameNumber]: {winner: newValue}}))
      // this.$set(this.winnerOfGame, gameNumber, newValue)
    },
    gameClicked(gameNumber) {
      this.gameNumber = parseInt(gameNumber, 10)
      this.showModal = true
    },
    safeGameAvailability(gameNumber) {
      return this.gameAvailability.hasOwnProperty(gameNumber) ? this.gameAvailability[gameNumber] : []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.can-click {
  .top-bar {
    cursor: pointer;
  }
}
// .bracket {
//   background: #f2f2f2;
// }
</style>
