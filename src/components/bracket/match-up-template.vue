<!-- Use template so there can be an empty -->
<template>
  <div class="match-up">
    <div class='top-bar'>
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
  .team {
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
