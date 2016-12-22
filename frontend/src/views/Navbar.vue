<template lang="pug">
  #Navbar
    nav.navbar.navbar-default.navbar-fixed-top(role='navigation')
      .container-fluid
        .navbar-header
          router-link.navbar-brand(to='/world', data-toggle='collapse' data-target='.navbar-collapse.in')
            i.fa.fa-fw.fa-lg.fa-globe
            | {{ 'title.world' | i18n }}
          transition(appear, appear-active-class="animated fadeIn", enter-active-class="animated fadeIn", leave-active-class="animated fadeOut", mode="in-out")
            span.label(v-bind:class='"label-" + advice.class') {{ advice.text | i18n }}
          button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#nav', aria-expanded='false', aria-controls='navbar')
            i.fa.fa-fw.fa-lg.fa-bars
        .collapse.navbar-collapse(id='nav')
          ul.nav.navbar-nav.navbar-right
            li
              router-link(to='/items', data-toggle='collapse' data-target='.navbar-collapse.in')
                i.ra.ra-fw.ra-lg.ra-crossed-axes
                | {{ 'title.items' | i18n }}
            li
              router-link(to='/resources', data-toggle='collapse' data-target='.navbar-collapse.in')
                i.ra.ra-fw.ra-lg.ra-gold-bar
                | {{ 'title.resources' | i18n }}
            li
              router-link(to='/spells', data-toggle='collapse' data-target='.navbar-collapse.in')
                i.ra.ra-fw.ra-lg.ra-crystal-wand
                | {{ 'title.spells' | i18n }}
            li
              router-link(to='/skills', data-toggle='collapse' data-target='.navbar-collapse.in')
                i.ra.ra-fw.ra-lg.ra-aura
                | {{ 'title.skills' | i18n }}
            li
              router-link(to='/recipes', data-toggle='collapse' data-target='.navbar-collapse.in')
                i.ra.ra-fw.ra-lg.ra-scroll-unfurled
                | {{ 'title.recipes' | i18n }}
            li
              router-link(to='/monsters', data-toggle='collapse' data-target='.navbar-collapse.in')
                i.ra.ra-fw.ra-lg.ra-hydra
                | {{ 'title.monsters' | i18n }}
            li.dropdown
              a.dropdown-toggle(data-toggle='dropdown')
                i.ra.ra-fw.ra-lg.ra-player
                | {{ 'title.account' | i18n }}
              ul.dropdown-menu
                li
                  router-link(to='/player', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-lg.ra-player
                    | {{ 'title.player' | i18n }}
                li
                  a.pointer(@click="localize('en')", data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-lg.ra-wooden-sign
                    | {{ 'language.english' | i18n }}
                li
                  a.pointer(@click="localize('es')", data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-lg.ra-wooden-sign
                    | {{ 'language.spanish' | i18n }}
                li
                  router-link(to='/about', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-lg.ra-question
                    | {{ 'title.about' | i18n }}
                li
                  a.pointer(@click='logout', data-toggle='collapse' data-target='.navbar-collapse.in')
                    i.ra.ra-fw.ra-lg.ra-key
                    | {{ 'button.logout' | i18n }}
</template>

<script>
  import authentication from '../services/authentication'
  import translation from '../services/translation'
  import notification from '../services/notification'
  import constants from '../config/constants'
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Navbar',
    data () {
      return {
        advices: [],
        advice: {},
      }
    },
    created () {
      api.getAdvices((advices) => {
        this.advices = advices;
        this.advice = this.advices[0];
        setInterval(() => {
          this.advice = this.advices[Math.floor(Math.random() * this.advices.length)];
        }, constants.notification * 4);
      });
    },
    methods: {
      localize (lang) {
        Vue.config.lang = lang;
        notification.success(Vue.t('language.change'));
      },
      logout () {
        authentication.logout();
        notification.success(Vue.t('alert.login.logout'));
        this.$router.push({ path: '/' });
      }
    },
    computed: {
      logged () {
        return authentication.logged;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  li.dropdown a
    cursor: pointer;
  .navbar-header span
    margin-top: 17px;
</style>