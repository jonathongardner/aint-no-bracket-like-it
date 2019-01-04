<template>
  <div class='round'>
    <div v-if='title' class='round-header'>
      {{title}}
    </div>
    <div class='match-ups'>
      <match-up v-for='(matchUp, index) in matchUps' :key='index' :game='matchUp'/> <!-- 90px by 200px -->
    </div>
  </div>
</template>

<script>
import MatchUp from './match-up.vue'

export default {
  name: 'Round',
  components: {
    MatchUp,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    matchUps: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
.round-header {
  font-size: 20px;
  text-align: center;
}
.match-ups {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  height: calc(100% - 30px);
}
</style>
