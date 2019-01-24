<template>
  <div :class="{'winner':winner}" @click.stop='changeWinner'>
    <template v-if="team.hasOwnProperty('rank')">
      <div class='team-n-rank'>
        {{team.rank}} {{team.shortName}}
      </div>
      <div>
        <span class='icon' :class='iconColor'>
          <i v-if='winner' class="fa-lg far fa-check-circle"></i>
          <i v-else-if='noWinner && !available' class="fa-lg fas fa-ban" title='This will leave no unique options for your bracket'></i>
          <i v-else class="fa-lg far fa-circle"></i>
        </span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'team-select',
  props: {
    value: {
      type: String,
      required: true,
    },
    team: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    winner() {
      return this.value ===  this.type
    },
    noWinner() {
      return this.value === ''
    },
    iconColor() {
      if (this.available) {
        return ['has-text-success']
      }
      if (this.noWinner && !this.available) {
        return ['has-text-danger']
      }
      return []
    }
  },
  methods: {
    changeWinner() {
      if (this.winner) {
        this.$emit('input', '')
      } else {
        this.$emit('input', this.type)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.team-n-rank {
  cursor: default;
}
</style>
