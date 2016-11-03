<template lang="pug">
  #Navbar
    nav.navbar.navbar-default(role='navigation')
      .navbar-header
        button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#nav', aria-expanded='false', aria-controls='navbar')
          span.sr-only Toggle navigation
          i.fa.fa-fw.fa-lg.fa-bars
        router-link.navbar-brand(to='/')
          i.fa.fa-fw.fa-lg.fa-globe
          | World
      .collapse.navbar-collapse(id='#nav')
        ul.nav.navbar-nav.navbar-right
          li
            router-link(to='/battle')
              i.ra.ra-lg.ra-fw.ra-lightning-sword
              | Battle
          li
            router-link(to='/items')
              i.ra.ra-lg.ra-fw.ra-crossed-axes
              | Items
          li
            router-link(to='/resources')
              i.ra.ra-lg.ra-fw.ra-diamond
              | Resources
          li
            router-link(to='/spells')
              i.ra.ra-lg.ra-fw.ra-crystal-wand
              | Spells
          li
            router-link(to='/recipes')
              i.ra.ra-lg.ra-fw.ra-scroll-unfurled
              | Recipes
          li
            router-link(to='/monsters')
              i.ra.ra-lg.ra-fw.ra-hydra
              | Monsters
          li
            router-link(to='/sales')
              i.fa.fa-lg.fa-fw.fa-shopping-bag
              | Store
          li
            router-link(to='/player')
              i.fa.fa-lg.fa-fw.fa-user
              | Player
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  
</style>
