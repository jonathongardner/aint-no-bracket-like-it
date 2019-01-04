<template>
  <div>
    <div class='tournament'>
      <region region='' :rounds="region1"></region>
      <region region='' :rounds="region4" :reverse='true'></region>
      <championship :regionGameI="games['61']" :regionGameII="games['62']" :championship="games['63']"></championship>
      <region region='' :rounds="region2" :bottom='true'></region>
      <region region='' :rounds="region3" :bottom='true' :reverse='true'></region>
    </div>
  </div>
</template>

<script>
import Region from '@/components/bracket/region.vue'
import Championship from '@/components/bracket/championship.vue'

export default {
  name: 'bracket',
  components: {
    Region,
    Championship
  },
  props: {
    games: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
  },
  computed: {
    region1() {
      const round1Region1 = [
        this.games['1'], this.games['2'], this.games['3'], this.games['4'],
        this.games['5'], this.games['6'], this.games['7'], this.games['8'],
      ]
      const round2Region1 = [
        this.games['33'], this.games['34'], this.games['35'], this.games['36'],
      ]
      const round3Region1 = [
        this.games['49'], this.games['50']
      ]
      const round4Region1 = [
        this.games['57']
      ]
      return [round1Region1, round2Region1, round3Region1, round4Region1]
    },
    region2() {
      const round1Region2 = [
        this.games['9'], this.games['10'], this.games['11'], this.games['12'],
        this.games['13'], this.games['14'], this.games['15'], this.games['16'],
      ]
      const round2Region2 = [
        this.games['37'], this.games['38'], this.games['39'], this.games['40'],
      ]
      const round3Region2 = [
        this.games['51'], this.games['52']
      ]
      const round4Region2 = [
        this.games['58']
      ]
      return [round1Region2, round2Region2, round3Region2, round4Region2]
    },
    region3() {
      const round1Region3 = [
        this.games['17'], this.games['18'], this.games['19'], this.games['20'],
        this.games['21'], this.games['22'], this.games['23'], this.games['24'],
      ]
      const round2Region3 = [
        this.games['41'], this.games['42'], this.games['43'], this.games['44'],
      ]
      const round3Region3 = [
        this.games['53'], this.games['54']
      ]
      const round4Region3 = [
        this.games['59']
      ]
      return [round1Region3, round2Region3, round3Region3, round4Region3]
    },
    region4() {
      const round1Region4 = [
        this.games['25'], this.games['26'], this.games['27'], this.games['28'],
        this.games['29'], this.games['30'], this.games['31'], this.games['32'],
      ]
      const round2Region4 = [
        this.games['45'], this.games['46'], this.games['47'], this.games['48'],
      ]
      const round3Region4 = [
        this.games['55'], this.games['56']
      ]
      const round4Region4 = [
        this.games['60']
      ]
      return [round1Region4, round2Region4, round3Region4, round4Region4]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tournament {
  .round1-match-ups {
    height: calc(8 * 90px);
  }
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  background: #f2f2f2;
  min-height: calc(100vh - 52px);
  min-width: 675px;
  }
.championship {
  grid-column: 1 / span 2
}
</style>
