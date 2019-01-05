<!-- Use template so there can be an empty -->
<template>
  <div class="match-up">
    <div class='top-bar'>
      <slot name='top-bar'/>
    </div>
    <div class='top-team' :class="{'winner':topWinner}">
      <div class='team-name'>
        <slot name='top-team-name'/>
      </div>
      <div class='team-score'>
        <slot name='top-team-score'/>
      </div>
    </div>
    <div class='bottom-team' :class="{'winner':bottomWinner}">
      <div class='team-name'>
        <slot name='bottom-team-name'/>
      </div>
      <div class='team-score'>
        <slot name='bottom-team-score'/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchUpTemplate',
  props: {
    topWinner: {
      type: Boolean,
      required: false,
      default: false,
    },
    bottomWinner: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.match-up {
  font-size: 12px;
  text-align: center;
  margin: 5px;
  border: 1px black solid;
  display: grid;
  // grid-template-columns: auto;
  grid-template-rows: 25px 30px 30px;
  background: #ffffff;
  width: 160px;
  .top-bar {
    padding: 2px;
    display: flex;
    flex: row;
    justify-content: space-between;
    flex-wrap: no-wrap;
    border-bottom: 1px black solid;
  }
  .bottom-team, .top-team {
    display: grid;
    grid-template-columns: auto 30px;
    div {
      white-space: nowrap;
      align-self: center;
    }
  }
  .winner {
    font-weight: bold;
  }
}
</style>
