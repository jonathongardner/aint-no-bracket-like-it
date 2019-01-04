<template>
  <div>
    <div class='tournament'>
      <region>
        <template slot='round1'>
          <slot name='game1'/>
          <slot name='game2'/>
          <slot name='game3'/>
          <slot name='game4'/>
          <slot name='game5'/>
          <slot name='game6'/>
          <slot name='game7'/>
          <slot name='game8'/>
        </template>
        <template slot='round2'>
          <slot name='game33'/>
          <slot name='game34'/>
          <slot name='game35'/>
          <slot name='game36'/>
        </template>
        <template slot='round3'>
          <slot name='game49'/>
          <slot name='game50'/>
        </template>
        <template slot='round4'>
          <slot name='game57'/>
        </template>
      </region>
      <region :reverse='true'>
        <template slot='round1'>
          <slot name='game32'/>
          <slot name='game31'/>
          <slot name='game30'/>
          <slot name='game29'/>
          <slot name='game28'/>
          <slot name='game27'/>
          <slot name='game26'/>
          <slot name='game25'/>
        </template>
        <template slot='round2'>
          <slot name='game48'/>
          <slot name='game47'/>
          <slot name='game46'/>
          <slot name='game45'/>
        </template>
        <template slot='round3'>
          <slot name='game56'/>
          <slot name='game55'/>
        </template>
        <template slot='round4'>
          <slot name='game60'/>
        </template>
      </region>
      <championship>
        <slot slot="regionGameI" name='game61'/>
        <slot slot="championship" name='game63'/>
        <slot slot="regionGameII" name='game62'/>
      </championship>
      <region :bottom='true'>
        <template slot='round1'>
          <slot name='game9'/>
          <slot name='game10'/>
          <slot name='game11'/>
          <slot name='game12'/>
          <slot name='game13'/>
          <slot name='game14'/>
          <slot name='game15'/>
          <slot name='game16'/>
        </template>
        <template slot='round2'>
          <slot name='game37'/>
          <slot name='game38'/>
          <slot name='game39'/>
          <slot name='game40'/>
        </template>
        <template slot='round3'>
          <slot name='game51'/>
          <slot name='game52'/>
        </template>
        <template slot='round4'>
          <slot name='game58'/>
        </template>
      </region>
      <region :bottom='true' :reverse='true'>
        <template slot='round1'>
          <slot name='game24'/>
          <slot name='game23'/>
          <slot name='game22'/>
          <slot name='game21'/>
          <slot name='game20'/>
          <slot name='game19'/>
          <slot name='game18'/>
          <slot name='game17'/>
        </template>
        <template slot='round2'>
          <slot name='game44'/>
          <slot name='game43'/>
          <slot name='game42'/>
          <slot name='game41'/>
        </template>
        <template slot='round3'>
          <slot name='game54'/>
          <slot name='game53'/>
        </template>
        <template slot='round4'>
          <slot name='game59'/>
        </template>
      </region>
    </div>
  </div>
</template>

<script>
import Region from '@/components/bracket/region.vue'
import Championship from '@/components/bracket/championship.vue'

export default {
  name: 'BracketTemplate',
  components: {
    Championship,
    Region,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tournament {
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
  grid-column: 1 / span 2;
}
</style>
