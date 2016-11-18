<template lang="pug">
  .container
    #Resources
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.resources' | i18n }} | 
              small {{ 'subtitle.resources' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.resources')")
      .row.equals
        .col-xs-12(v-if='!filtered.length')
          .well.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        .col-xs-3(v-for='resource in filtered')
          .panel.text-center(v-bind:class='"panel-" + resource.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + resource.icon')  
                span {{ resource.name | i18n }}
            .panel-body
              img.thumbnail.resource(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity')
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Resources',
    data () {
      return {
        filter: '',
        resources: [],
      }
    },
    created () {
      api.getResources((data) => {
        this.resources = data;
      });
    },
    computed: {
      filtered () {
        return this.resources.filter((resource) => {
          return Vue.t(resource.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>