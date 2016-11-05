<template lang="pug">
  .container
    #Inn
      .row
        .col-xs-12
          .page-header
            h1 Inn 
              small Start quests
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-lg.fa-search
              input(v-model='filter', type='text', class='form-control', placeholder='Find quests')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-lg.fa-trash
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Inn',
    data: function() { 
      return {
        filter: '',
        quests: []
      }
    },
    created: function() {
      self = this;
      factory.getQuests((data) => {
        self.quests = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    }
  }
</script>

<style scoped>

</style>
