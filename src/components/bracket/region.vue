<template>
  <div class='region' :class="[reverse ? 'region-right' : 'region-left', bottom ? 'region-bottom' : 'region-top']">
    <template v-for='(round, index) in rounds'>
      <round :title="index | roundText" :matchUps='round'/>
    </template>
  </div>
</template>

<script>
import Round from './round.vue'

export default {
  name: 'Region',
  components: {
    Round,
  },
  props: {
    rounds: {
      type: Array,
      required: true
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
    bottom: {
      type: Boolean,
      required: false,
      default: false,
    },
    region: {
      type: String,
      required: true,
    }
  },
  filters: {
    roundText(index, showRounds) {
      return 'Round ' + (index + 1)
    }
  }
}
</script>

<style scoped lang="scss">
.region {
  .round1-match-ups {
    height: calc(8 * 90px);
  }
  display: flex;
  justify-content: flex-start; //space-between;
  flex-wrap: wrap;
}
.region-top {
  flex-wrap: wrap;
}
.region-bottom {
  flex-wrap: wrap-reverse;
}
.region-left {
  flex-direction: row;
}
.region-right {
  flex-direction: row-reverse;
}
</style>
