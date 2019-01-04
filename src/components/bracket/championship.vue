<template>
  <div class='championship'>
    <div>
      <div class='championship-header'>
        Final Four
      </div>
      <match-up :game='regionGameI'/>
    </div>
    <div>
      <div class='championship-header'>
        Championship
      </div>
      <match-up :game='championship'/>
    </div>
    <div>
      <div class='championship-header'>
        Final Four
      </div>
      <match-up :game='regionGameII'/>
    </div>
  </div>
</template>

<script>
import MatchUp from './match-up.vue'

export default {
  name: 'Championship',
  components: {
    MatchUp,
  },
  props: {
    regionGameI: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    regionGameII: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    championship: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
  },
}
</script>

<style scoped lang="scss">
.championship-header {
  font-size: 20px;
  text-align: center;
}
.championship {
  display: flex;
  justify-content: center; //space-between;
  flex-wrap: wrap;
}
.region-left {
  flex-direction: row;
}
.region-right {
  flex-direction: row-reverse;
}
</style>
