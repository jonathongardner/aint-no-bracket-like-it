<template>
  <div class='region' :class="[reverse ? 'region-right' : 'region-left', bottom ? 'region-bottom' : 'region-top']">
    <div class='round'>
      <div v-if='!bottom' class='round-header'>
        Round 1
      </div>
      <div class='match-ups'>
        <slot name='round1'/>
      </div>
      <div v-if='bottom' class='round-header'>
        Round 1
      </div>
    </div>
    <div class='round'>
      <div v-if='!bottom' class='round-header'>
        Round 2
      </div>
      <div class='match-ups'>
        <slot name='round2'/>
      </div>
      <div v-if='bottom' class='round-header'>
        Round 2
      </div>
    </div>
    <div class='round'>
      <div v-if='!bottom' class='round-header'>
        Round 3
      </div>
      <div class='match-ups'>
        <slot name='round3'/>
      </div>
      <div v-if='bottom' class='round-header'>
        Round 3
      </div>
    </div>
    <div class='round'>
      <div v-if='!bottom' class='round-header'>
        Round 4
      </div>
      <div class='match-ups'>
        <slot name='round4'/>
      </div>
      <div v-if='bottom' class='round-header'>
        Round 4
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Region',
  props: {
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
  }
}
</script>

<style scoped lang="scss">
.region {
  display: flex;
  justify-content: space-between; //flex-start;
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
