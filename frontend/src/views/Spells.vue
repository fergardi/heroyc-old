<template lang="pug">
  .container
    #Spells
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ 'title.spells' | i18n }} | 
              small {{ 'subtitle.spells' | i18n }}
        .col-xs-12
          form#title.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input#search(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.spells')")
        .col-md-3.col-xs-3(v-for='spell in filtered')
          .panel.text-center(v-bind:class='"panel-" + spell.family')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + spell.icon')  
                span {{ spell.name | i18n }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + spell.mana * 10 + "%"')
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Spells',
    data () { 
      return {
        filter: '',
        spells: [],
      }
    },
    created () {
      api.getSpells((data) => {
        this.spells = data;
      });
    },
    methods: {
      reset () {
        this.filter = '';
      }
    },
    computed: {
      filtered () {
        return this.spells.filter((spell) => {
          return Vue.t(spell.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>