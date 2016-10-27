<template lang="pug">
  div
    .container
      navbar
    .container.fixed
      .row
        .col-md-offset-6.col-md-6.col-xs-12.alerts
    .container
      router-view
</template>

<script>
  import navbar from './components/Navbar.vue'
  export default {
    components: { navbar }
  }
</script>

<style>

</style>