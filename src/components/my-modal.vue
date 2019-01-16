<template>
  <div class="modal" :class="{'is-active' : value}">
    <div class="modal-background" @click='closeModal'></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name='header' />
      </header>
      <section class="modal-card-body">
        <slot name='section' />
      </section>
      <footer class="modal-card-foot my-footer">
        <slot name='footer' />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    value: { // Do not require value so a v-if can be used with modal
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('input', false)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.my-footer {
  justify-content: flex-end;
}
</style>
