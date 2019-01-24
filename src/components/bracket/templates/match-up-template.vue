<!-- Use template so there can be an empty -->
<template>
  <div class="match-up" @click="$emit('click')">
    <div class='top-bar' @click="$emit('top-bar-click')">
      <slot name='top-bar'/>
    </div>
    <slot name='teams'/>
  </div>
</template>

<script>
export default {
  name: 'MatchUpTemplate',
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
  .team-info {
    display: grid;
    grid-template-columns: auto 30px;
    align-items: center;
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
