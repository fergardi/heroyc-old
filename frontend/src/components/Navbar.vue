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
          li
            router-link(to='/recipes')
              i.fa.fa-lg.fa-fw.fa-magic
              = 'Recipes'
          li
            router-link(to='/sales')
              i.fa.fa-lg.fa-fw.fa-shopping-bag
              = 'Sales'
          li
            router-link(to='/player')
              i.fa.fa-lg.fa-fw.fa-user
              = 'Player'
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  
</style>
