<template lang="pug">
  #Navbar
    nav.navbar.navbar-default(role='navigation')
      .container-fluid
        .navbar-header
          button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#nav', aria-expanded='false', aria-controls='navbar')
            span.sr-only Toggle navigation
            i.fa.fa-fw.fa-lg.fa-bars
          router-link.navbar-brand(to='/world')
            i.fa.fa-fw.fa-lg.fa-globe
            | World
        .collapse.navbar-collapse(id='nav')
          ul.nav.navbar-nav.navbar-right
            li
              router-link(to='/player')
                i.ra.ra-lg.ra-fw.ra-player-king
                | Player
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
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  
</style>
