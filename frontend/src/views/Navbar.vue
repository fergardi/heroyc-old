<template lang="pug">
  #Navbar
    nav.navbar.navbar-default.navbar-fixed-top(role='navigation')
      .container-fluid
        .navbar-header
          button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#nav', aria-expanded='false', aria-controls='navbar')
            i.fa.fa-fw.fa-lg.fa-bars
          router-link.navbar-brand(to='/world')
            i.fa.fa-fw.fa-lg.fa-globe
            | {{ 'title.world' | i18n }}
        .collapse.navbar-collapse(id='nav')
          ul.nav.navbar-nav.navbar-right
            //
              li.dropdown
                a.dropdown-toggle(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='false')
                  i.fa.fa-lg.fa-fw.fa-book
                  | Test1
                  i.fa.fa-lg.fa-fw.fa-caret-down
                ul.dropdown-menu
                  li
                    router-link(to='/inn', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.inn' | i18n }}
                  li
                    router-link(to='/forge', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.forge' | i18n }}
                  li
                    router-link(to='/market', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.market' | i18n }}
                  li
                    router-link(to='/city', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.city' | i18n }}
                  li
                    router-link(to='/player', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.player' | i18n }}
              li.dropdown
                a.dropdown-toggle(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='false')
                  i.fa.fa-lg.fa-fw.fa-book
                  | Test2
                  i.fa.fa-lg.fa-fw.fa-caret-down
                ul.dropdown-menu
                  li
                    router-link(to='/location', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.mine' | i18n }}
                  li
                    router-link(to='/location', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.dungeon' | i18n }}
                  li
                    router-link(to='/location', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.tower' | i18n }}
                  li
                    router-link(to='/location', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-crossed-axes
                      | {{ 'title.ruins' | i18n }}
            li.dropdown
              a.dropdown-toggle(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='false')
                i.fa.fa-lg.fa-fw.fa-book
                | {{ 'title.help' | i18n }}
                i.fa.fa-lg.fa-fw.fa-caret-down
              ul.dropdown-menu
                li
                  router-link(to='/items', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-crossed-axes
                    | {{ 'title.items' | i18n }}
                li
                  router-link(to='/resources', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-gold-bar
                    | {{ 'title.resources' | i18n }}
                li
                  router-link(to='/spells', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-crystal-wand
                    | {{ 'title.spells' | i18n }}
                li
                  router-link(to='/skills', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-aura
                    | {{ 'title.skills' | i18n }}
                li
                  router-link(to='/recipes', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-scroll-unfurled
                    | {{ 'title.recipes' | i18n }}
                li
                  router-link(to='/monsters', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-hydra
                    | {{ 'title.monsters' | i18n }}
            li.dropdown
              a.dropdown-toggle(href='#', data-toggle='dropdown', role='button', aria-haspopup='true', aria-expanded='false')
                i.fa.fa-lg.fa-fw.fa-book
                | {{ 'title.account' | i18n }}
                i.fa.fa-lg.fa-fw.fa-caret-down
              ul.dropdown-menu
                  li
                    router-link(to='/player', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-player
                      | {{ 'title.player' | i18n }}
                  li
                    a.pointer(@click="localize('en')", data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-wooden-sign
                      | {{ 'language.english' | i18n }}
                  li
                    a.pointer(@click="localize('es')", data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-wooden-sign
                      | {{ 'language.spanish' | i18n }}
                  li
                    a.pointer(@click='logout', data-toggle='collapse' data-target='.navbar-collapse.in')
                      i.ra.ra-fw.ra-key
                      | {{ 'button.logout' | i18n }}
</template>

<script>
  import auth from '../services/auth'
  import translation from '../services/translation'
  import notification from '../services/notification'
  import Vue from 'vue'
  export default {
    name: 'Navbar',
    methods: {
      localize (lang) {
        Vue.config.lang = lang;
        notification.success(Vue.t('language.change'));
      },
      logout () {
        auth.logout();
        notification.success(Vue.t('alert.login.logout'));
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