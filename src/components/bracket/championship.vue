<template>
  <div class='championship'>
    <div>
      <div class='championship-header'>
        Final Four
      </div>
      <slot name='regionGameI'/>
    </div>
    <div>
      <div class='championship-header'>
        Championship
      </div>
      <slot name='championship'/>
    </div>
    <div>
      <div class='championship-header'>
        Final Four
      </div>
      <slot name='regionGameII'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Championship',
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
</style>
