<template lang="pug">
  .container
    #Home
      .row
        .col-xs-12
          .page-header
            h1 {{ 'title.home' | i18n }} | 
              small {{ 'subtitle.home' | i18n }}
        .col-md-4.col-md-offset-2.col-xs-12
          .panel.text-center.panel-primary
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span {{ 'panel.login' | i18n }}
            .panel-body
              form
                input.form-control(type='email', id='username', v-bind:placeholder="$t('placeholder.username')", v-model='credentials.username', required)
                input.form-control(type='password', id='password', v-bind:placeholder="$t('placeholder.password')", v-model='credentials.password', required)
                br
                a.btn.btn-success.btn-block(@click='login()')
                  i.fa.fa-fw.fa-lg.fa-sign-in
                  | {{ 'button.login' | i18n }}
        .col-md-4.col-xs-12
          .panel.text-center.panel-warning
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user-plus
                span {{ 'panel.register' | i18n }}
            .panel-body
              form
                input.form-control(type='email', id='username', v-bind:placeholder="$t('placeholder.username')", v-model='information.username', required)
                input.form-control(type='password', id='password', v-bind:placeholder="$t('placeholder.password')", v-model='information.password', required)
                br
                a.btn.btn-success.btn-block(@click='register()')
                  i.fa.fa-lg.fa-fw.fa-check
                  | {{ 'button.register' | i18n }}
</template>

<script>
  import auth from '../services/auth'
  import notification from '../services/notification'
  import Vue from 'vue'
  export default {
    name: 'Home',
    data () { 
      return {
        credentials: {
          username: 'test@test.com',
          password: 'test'
        },
        information: {
          username: 'test@test.com',
          password: 'test'
        },
      }
    },
    methods: {
      login () {
        auth.login(this.credentials, (success) => {
          if (success) {
            notification.success(Vue.t('alert.login.ok'));
            this.$router.push({ name: 'world' });
          } else {
            notification.danger(Vue.t('alert.login.error'));
          }
        });
      },
      register () {
        auth.register(this.information, (success) => {
          if (success) {
            notification.success(Vue.t('alert.register.ok'));
            this.$router.push({ name: 'world' });
          } else {
            notification.danger(Vue.t('alert.register.error'));
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>