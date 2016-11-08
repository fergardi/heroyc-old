<template lang="pug">
  #Navbar
    nav.navbar.navbar-default.navbar-fixed-top(role='navigation')
      .container-fluid
        .navbar-header
          button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#nav', aria-expanded='false', aria-controls='navbar')
            i.fa.fa-fw.fa-lg.fa-bars
          router-link.navbar-brand(to='/world')
            i.fa.fa-fw.fa-lg.fa-globe
            | {{ $t('title.world') }}
        .collapse.navbar-collapse(id='nav')
          ul.nav.navbar-nav.navbar-right
            li
              router-link(to='/player', data-toggle='collapse' data-target='.navbar-collapse.in', v-if='logged')
                i.ra.ra-lg.ra-fw.ra-player-king
                | {{ $t('title.player') }}
            li.dropdown
              a.dropdown-toggle(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='false')
                i.fa.fa-lg.fa-fw.fa-book
                | {{ $t('title.wiki') }}
                i.fa.fa-lg.fa-fw.fa-caret-down
              ul.dropdown-menu
                li
                  router-link(to='/items', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-lg.ra-fw.ra-crossed-axes
                    | {{ $t('title.items') }}
                li
                  router-link(to='/resources', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-lg.ra-fw.ra-gold-bar
                    | {{ $t('title.resources') }}
                li
                  router-link(to='/spells', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-lg.ra-fw.ra-crystal-wand
                    | {{ $t('title.spells') }}
                li
                  router-link(to='/skills', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-lg.ra-fw.ra-aura
                    | {{ $t('title.skills') }}
                li
                  router-link(to='/recipes', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-lg.ra-fw.ra-scroll-unfurled
                    | {{ $t('title.recipes') }}
                li
                  router-link(to='/monsters', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-lg.ra-fw.ra-hydra
                    | {{ $t('title.monsters') }}
            li.dropdown
              a.dropdown-toggle(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='false')
                i.fa.fa-lg.fa-fw.fa-language
                | {{ $t('title.language') }}
                i.fa.fa-lg.fa-fw.fa-caret-down
              ul.dropdown-menu
                li
                  a.pointer(@click="localize('en')")
                    i.fa.fa-lg.fa-fw.fa-flag-checkered
                    | {{ $t('language.english') }}
                li
                  a.pointer(@click="localize('es')")
                    i.fa.fa-lg.fa-fw.fa-flag
                    | {{ $t('language.spanish') }}
            li
              a.pointer(@click='logout')
                i.fa.fa-lg.fa-fw.fa-sign-out
                | Logout
</template>

<script>
  import Vue from 'vue'
  import locales from '../services/locales'
  import auth from '../services/auth'
  export default {
    name: 'Navbar',
    methods: {
      localize (lang) {
        Vue.config.lang = lang;
      },
      logout () {
        auth.logout();
        this.$router.push({ path: '/' });
      }
    },
    computed: {
      logged () {
        return auth.logged;
      }
    }
  }
</script>

<style lang='stylus' scoped>
</style>