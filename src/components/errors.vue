<template>
  <div class='errors'>
    <div v-for='(message, index) in messages' :key='index'>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Errors',
  props: {
    responseError: {
      type: Error,
      required: false,
    },
    defaultMessage: {
      type: String,
      required: false,
      default: 'Could not save.',
    }
  },
  computed: {
    messages() {
      if(this.responseError) {
        if (this.responseError.response) {
          const errors = this.responseError.response.data.errors
          const toReturn = []
          for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
              const words = key.toLowerCase().split('_');
              for (var i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
              }
              toReturn.push(words.join(' ') + ': ' + errors[key] + '.')
            }
          }
          return toReturn
        }
        return [this.defaultMessage]
      }
      return []
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.errors {
  div {
    color: red;
  }
}
</style>
