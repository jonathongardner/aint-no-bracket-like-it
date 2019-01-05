<template>
  <div>
    <div class='tournament'>
      <region>
        <template slot='round1'>
          <slot name='game1'>
            <match-up-template/>
          </slot>
          <slot name='game2'>
            <match-up-template/>
          </slot>
          <slot name='game3'>
            <match-up-template/>
          </slot>
          <slot name='game4'>
            <match-up-template/>
          </slot>
          <slot name='game5'>
            <match-up-template/>
          </slot>
          <slot name='game6'>
            <match-up-template/>
          </slot>
          <slot name='game7'>
            <match-up-template/>
          </slot>
          <slot name='game8'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round2'>
          <slot name='game33'>
            <match-up-template/>
          </slot>
          <slot name='game34'>
            <match-up-template/>
          </slot>
          <slot name='game35'>
            <match-up-template/>
          </slot>
          <slot name='game36'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round3'>
          <slot name='game49'>
            <match-up-template/>
          </slot>
          <slot name='game50'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round4'>
          <slot name='game57'>
            <match-up-template/>
          </slot>
        </template>
      </region>
      <region :reverse='true'>
        <template slot='round1'>
          <slot name='game32'>
            <match-up-template/>
          </slot>
          <slot name='game31'>
            <match-up-template/>
          </slot>
          <slot name='game30'>
            <match-up-template/>
          </slot>
          <slot name='game29'>
            <match-up-template/>
          </slot>
          <slot name='game28'>
            <match-up-template/>
          </slot>
          <slot name='game27'>
            <match-up-template/>
          </slot>
          <slot name='game26'>
            <match-up-template/>
          </slot>
          <slot name='game25'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round2'>
          <slot name='game48'>
            <match-up-template/>
          </slot>
          <slot name='game47'>
            <match-up-template/>
          </slot>
          <slot name='game46'>
            <match-up-template/>
          </slot>
          <slot name='game45'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round3'>
          <slot name='game56'>
            <match-up-template/>
          </slot>
          <slot name='game55'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round4'>
          <slot name='game60'>
            <match-up-template/>
          </slot>
        </template>
      </region>
      <championship>
        <slot slot="regionGameI" name='game61'>
          <match-up-template/>
        </slot>
        <slot slot="championship" name='game63'>
          <match-up-template/>
        </slot>
        <slot slot="regionGameII" name='game62'>
          <match-up-template/>
        </slot>
      </championship>
      <region :bottom='true'>
        <template slot='round1'>
          <slot name='game9'>
            <match-up-template/>
          </slot>
          <slot name='game10'>
            <match-up-template/>
          </slot>
          <slot name='game11'>
            <match-up-template/>
          </slot>
          <slot name='game12'>
            <match-up-template/>
          </slot>
          <slot name='game13'>
            <match-up-template/>
          </slot>
          <slot name='game14'>
            <match-up-template/>
          </slot>
          <slot name='game15'>
            <match-up-template/>
          </slot>
          <slot name='game16'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round2'>
          <slot name='game37'>
            <match-up-template/>
          </slot>
          <slot name='game38'>
            <match-up-template/>
          </slot>
          <slot name='game39'>
            <match-up-template/>
          </slot>
          <slot name='game40'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round3'>
          <slot name='game51'>
            <match-up-template/>
          </slot>
          <slot name='game52'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round4'>
          <slot name='game58'>
            <match-up-template/>
          </slot>
        </template>
      </region>
      <region :bottom='true' :reverse='true'>
        <template slot='round1'>
          <slot name='game24'>
            <match-up-template/>
          </slot>
          <slot name='game23'>
            <match-up-template/>
          </slot>
          <slot name='game22'>
            <match-up-template/>
          </slot>
          <slot name='game21'>
            <match-up-template/>
          </slot>
          <slot name='game20'>
            <match-up-template/>
          </slot>
          <slot name='game19'>
            <match-up-template/>
          </slot>
          <slot name='game18'>
            <match-up-template/>
          </slot>
          <slot name='game17'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round2'>
          <slot name='game44'>
            <match-up-template/>
          </slot>
          <slot name='game43'>
            <match-up-template/>
          </slot>
          <slot name='game42'>
            <match-up-template/>
          </slot>
          <slot name='game41'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round3'>
          <slot name='game54'>
            <match-up-template/>
          </slot>
          <slot name='game53'>
            <match-up-template/>
          </slot>
        </template>
        <template slot='round4'>
          <slot name='game59'>
            <match-up-template/>
          </slot>
        </template>
      </region>
    </div>
  </div>
</template>

<script>
import MatchUpTemplate from '@/components/bracket/match-up-template.vue'
import Region from '@/components/bracket/region.vue'
import Championship from '@/components/bracket/championship.vue'

export default {
  name: 'BracketTemplate',
  components: {
    MatchUpTemplate,
    Region,
    Championship,
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
  min-height: calc(100vh - 52px);
  min-width: 675px;
}
.championship {
  grid-column: 1 / span 2;
}
</style>
