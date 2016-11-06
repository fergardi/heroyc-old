<template lang="pug">
  .container
    #Inn
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 Inn 
              small Start quests
        .col-xs-12
          form#search.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-lg.fa-search
              input(v-model='filter', type='text', class='form-control', placeholder='Find quests')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-lg.fa-trash
        .col-md-3.col-xs-4(v-for='quest in filtered')
          .panel.text-center(v-bind:class='"panel-" + quest.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + quest.icon')  
                span {{quest.name}}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/quests/" + quest.image + ".png"', v-bind:class='"panel-" + quest.rarity', data-toggle='tooltip', v-bind:title='quest.name')
              p {{quest.description}}
            .panel-body
              button.btn.btn-success.btn-block
                i.fa.fa-lg.fa-check
                | Accept
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
    },
    computed: {
      filtered: function() {
        return this.quests.filter(function(quest) {
          return quest.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style scoped>

</style>
