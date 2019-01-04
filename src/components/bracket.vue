<!--
Use slots so it will be easier when user can edit Bracket
so data doesnt have to keep propagating up
-->
<template>
  <div>
    <bracket-template>
      <template v-for="(game, gameNumber) in games">
        <match-up :slot="'game' + gameNumber" :game='game'/>
      </template>
    </bracket-template>
  </div>
</template>

<script>
import MatchUp from '@/components/bracket/match-up.vue'
import BracketTemplate from '@/components/bracket/bracket-template.vue'

export default {
  name: 'bracket',
  components: {
    BracketTemplate,
    MatchUp,
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
