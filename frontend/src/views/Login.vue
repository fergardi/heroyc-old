<template lang="pug">
  .container
    #Login
      .row
        .col-xs-12
          .page-header.text-center
            h1 Login 
              small Explore the world
        .col-md-4.col-md-offset-4.col-xs-12
          .panel.text-center.panel-primary
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg.ra-player-king
                span Credentials
            .panel-body
              form
                input.form-control(type='email', id='username', placeholder='Username', v-model='credentials.username', required)
                input.form-control(type='password', id='password', placeholder='Password', v-model='credentials.password', required)
                a.btn.btn-success.btn-block(@click='submit()')
                  i.fa.fa-fw.fa-lg.fa-sign-in
                  | Login
        .col-md-4.col-md-offset-4.col-xs-12
          .panel.text-center.panel-warning
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg.ra-player-king
                span Register
            .panel-body
              form
                input.form-control(type='email', id='username', placeholder='Username', v-model='credentials.username', required)
                input.form-control(type='password', id='password', placeholder='Password', v-model='credentials.password', required)
                a.btn.btn-info.btn-block
                  i.ra.ra-lg.ra-fw.ra-aura
                  | Register
</template>

<script>
  import auth from '../services/auth'
  export default {
    name: 'Login',
    data () { 
      return {
        credentials: {
          username: 'test@test.com',
          password: 'test'
        }
      }
    },
    created () {
      self = this;
    },
    methods: {
      submit () {
        auth.login(self.credentials, function(success) {
          if (success) {
            notification.success('Welcome back, Hero');
            self.$router.push({ name: 'world' });
          } else {
            notification.danger('Invalid credentials');
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>