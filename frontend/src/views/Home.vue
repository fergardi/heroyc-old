<template lang="pug">
  .container
    #Home
      .row
        .col-xs-12
          .page-header
            h1 {{ $t('title.home') }} | 
              small {{ $t('subtitle.home') }}
        .col-md-4.col-md-offset-2.col-xs-12
          .panel.text-center.panel-primary
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span {{ $t('panel.login') }}
            .panel-body
              form
                input.form-control(type='email', id='username', v-bind:placeholder="$t('placeholder.username')", v-model='credentials.username', required)
                input.form-control(type='password', id='password', v-bind:placeholder="$t('placeholder.password')", v-model='credentials.password', required)
                br
                a.btn.btn-success.btn-block(@click='login()')
                  i.fa.fa-fw.fa-lg.fa-sign-in
                  | {{ $t('button.login') }}
        .col-md-4.col-xs-12
          .panel.text-center.panel-warning
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user-plus
                span {{ $t('panel.register') }}
            .panel-body
              form
                input.form-control(type='email', id='username', v-bind:placeholder="$t('placeholder.username')", v-model='information.username', required)
                input.form-control(type='password', id='password', v-bind:placeholder="$t('placeholder.password')", v-model='information.password', required)
                br
                a.btn.btn-success.btn-block(@click='register()')
                  i.fa.fa-lg.fa-fw.fa-check
                  | {{ $t('button.register') }}
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
    created () {
      self = this;
    },
    methods: {
      login () {
        auth.login(self.credentials, function(success) {
          if (success) {
            notification.success(Vue.t('alert.login.ok'));
            self.$router.push({ name: 'world' });
          } else {
            notification.danger(Vue.t('alert.login.error'));
          }
        });
      },
      register () {
        auth.register(self.information, function(success) {
          if (success) {
            notification.success(Vue.t('alert.register.ok'));
            self.$router.push({ name: 'world' });
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