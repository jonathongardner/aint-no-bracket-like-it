<template>
  <div>
    <div class='carousel-year-picker'>
      <div>
        <router-link class='button is-white' :to="firstYear | bracket_route">
          <i class="fas fa-fast-backward"></i>
        </router-link>
      </div>
      <div class='before years'>
        <router-link class='button is-white' v-for="y in beforeYears" :key='y' :class="'away' + (year - y)" :to="y | bracket_route">
          {{y}}
        </router-link>
      </div>
      <div class='current-year'>
        {{ year }}
      </div>
      <div class='after years'>
        <router-link class='button is-white' v-for="y in afterYears" :key='y' :class="'away' + (y - year)" :to="y | bracket_route">
          {{y}}
        </router-link>
      </div>
      <div>
        <router-link class='button is-white' :to="lastYear | bracket_route">
          <i class="fas fa-fast-forward"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import bracketOptions from '@/helpers/bracketOptions.js'
export default {
  name: 'YearPicker',
  props: {
    year: Number
  },
  data() {
    return {
      firstYear: bracketOptions.firstYear,
      lastYear: bracketOptions.lastYear,
    }
  },
  filters: {
    bracket_route: function (year) {
      return '/brackets/' + year
    }
  },
  computed: {
    afterYears() {
      let afterYear = this.year + 1
      const toReturn = []
      while (this.lastYear >= afterYear && 6 > afterYear - this.year) {
        toReturn.push(afterYear)
        afterYear++
      }
      return toReturn
    },
    beforeYears() {
      let beforeYear = this.year - 1
      const toReturn = []
      while (beforeYear >= this.firstYear && 6 > this.year - beforeYear) {
        toReturn.push(beforeYear)
        beforeYear--
      }
      return toReturn.reverse()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.after, .before, .carousel-year-picker {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  a {
    padding: 0px 5px;
  }
}
.years {
  flex: 1;
}
.after {
  justify-content: flex-start;
}
.before {
  justify-content: flex-end;
}
.carousel-year-picker {
  justify-content: center;
  align-items: stretch;
  div {
    padding: 0px 5px;
  }
  .current-year {
    color: #0a0a0a;
    font-size: 2.2rem;
  }
  .away1 {
    font-size: 1.8rem;
  }
  .away2 {
    font-size: 1.6rem;
  }
  .away3 {
    font-size: 1.4rem;
  }
  .away4 {
    font-size: 1.2rem;
  }
  .away5 {
    font-size: 1.0rem;
  }
}
</style>
