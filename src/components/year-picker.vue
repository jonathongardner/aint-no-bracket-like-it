<template>
  <div class="year-picker">
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <button class="button is-medium" aria-haspopup="true" aria-controls="year-picker">
          <span>{{ year }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="year-picker-menu" role="menu">
        <div class="dropdown-content">
          <router-link v-for="y in years" :key="y" class="dropdown-item" :to="y | bracket_route">
            {{y}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YearPicker',
  data() {
    return {
      years: [
        2017, 2016, 2015,
        2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005,
        2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995,
        1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985
      ],
    }
  },
  props: {
    year: String
  },
  filters: {
    bracket_route: function (year) {
      return '/brackets/' + year
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
