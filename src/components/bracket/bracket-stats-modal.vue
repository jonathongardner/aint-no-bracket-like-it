<template>
  <div class="modal" :class="{'is-active' : value}">
    <div class="modal-background" @click='closeModal'></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Game {{ gameNumber }}</p>
        <button class="delete" aria-label="close" @click='closeModal'></button>
      </header>
      <section class="modal-card-body">
          <div>
            Top Ranks: {{ commonTopRank }}
          </div>
          <div>
            Bottom Ranks: {{ commonBottomRank }}
          </div>
          <div>
            Match Up Ranks: {{ commonMatchUps }}
          </div>
          <div>
            <div>
              All Games:
            </div>
            <div class='all-games'>
              <match-up v-for="(game, y) in gameStats.allGames" :game='game' :key="y" :class="{'current-year': year === parseInt(y, 10)}"/>
            </div>
          </div>
      </section>
      <footer class="modal-card-foot">
      </footer>
    </div>
  </div>
</template>

<script>
import MatchUp from '@/components/bracket/match-up.vue'
import {bracketApi} from '@/helpers/api.js'

export default {
  name: 'bracket-stats-modal',
  components: {
    MatchUp,
  },
  props: {
    gameNumber: {
      type: Number,
      required: false,
    },
    year: {
      type: Number,
      required: false,
      default: -1,
    },
    value: { // Do require value so a v-if can be used with modal
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      gameStats: {},
      previousGameNumber: -1,
    }
  },
  computed: {
    commonTopRank() {
      return this.gameStats.commonTopRank && this.gameStats.commonTopRank.map(x => ("" + x.rank + ' (' + x.count + ')')).join(', ')
    },
    commonBottomRank() {
      return this.gameStats.commonBottomRank && this.gameStats.commonBottomRank.map(x => ("" + x.rank + ' (' + x.count + ')')).join(', ')
    },
    commonMatchUps() {
      return this.gameStats.commonMatchUps && this.gameStats.commonMatchUps.map(x => ("" + x.topRank + " vs. " + x.bottomRank + ' (' + x.count + ')')).join(', ')
    },
  },
  methods: {
    closeModal() {
      this.$emit('input', false)
    },
    getGameStats() {
      if (this.previousGameNumber !== this.gameNumber) {
        this.previousGameNumber = this.gameNumber
        bracketApi.getBracketGameStats(this.gameNumber).then(gs => {
          this.gameStats = gs
        })
      }
    },
  },
  watch: {
    value(newValue) {
      if (newValue) {
        this.getGameStats()
      }
    }
  },
  created() {
    if (this.value) {
      this.getGameStats()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.current-year {
  // TODO Think about how to show current year in games
  // border-color: #440000;
}
.all-games {
  display: flex;
  flex-wrap: wrap;
}
</style>
