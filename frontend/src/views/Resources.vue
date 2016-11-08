<template lang="pug">
  .container
    #Resources
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ $t('title.resources') }} | 
              small {{ $t('subtitle.resources') }}
        .col-xs-12
          form#search.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='text', class='form-control', v-bind:placeholder="$t('placeholder.resources')")
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-trash
        .col-md-3.col-xs-3(v-for='resource in filtered')
          .panel.text-center(v-bind:class='"panel-" + resource.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + resource.icon')  
                span {{$t(resource.name)}}
            .panel-body
              img.thumbnail.resource(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity')
              p Used for crafting
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Resources',
    data: function() {
      return {
        filter: '',
        resources: []
      }
    },
    created: function() {
      self = this;
      api.getResources((data) => {
        self.resources = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return self.resources.filter(function(resource) {
          return Vue.t(resource.name).toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>