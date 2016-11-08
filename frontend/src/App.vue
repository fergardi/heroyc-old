<template lang="pug">
  div
    navbar
    .container.fixed
      .row
        .col-md-offset-6.col-md-6.col-xs-12.alerts
    router-view
</template>

<script>
  import navbar from './views/Navbar.vue'
  export default {
    components: { navbar }
  }
</script>

<style lang="stylus" scoped>
</style>