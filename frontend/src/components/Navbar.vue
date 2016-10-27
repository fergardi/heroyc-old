<template lang="pug">
  #Navbar
    nav.navbar.navbar-default(role='navigation')
      .navbar-header
        button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#nav', aria-expanded='false', aria-controls='navbar')
          span.sr-only Toggle navigation
          i.fa.fa-lg.fa-bars
        router-link.navbar-brand(to='/')
          i.fa.fa-map
          = 'Map'
      .collapse.navbar-collapse(id='#nav')
        ul.nav.navbar-nav.navbar-right
          li
            router-link(to='/items')
              i.fa.fa-lg.fa-fw.fa-cubes
              = 'Items'
          li
            router-link(to='/resources')
              i.fa.fa-lg.fa-fw.fa-diamond
              = 'Resources'
          li
            router-link(to='/spells')
              i.fa.fa-lg.fa-fw.fa-magic
              = 'Spells'
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  
</style>
