<template lang="pug">
  .container
    #Spells
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.spells' | i18n }} | 
              small {{ 'subtitle.spells' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input#search(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.spells')")
      .row
        .col-xs-12.animated.fadeIn(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        transition-group(tag='div', enter-active-class='animated fadeIn')
          .col-xs-3(v-for='spell in filtered', v-bind:key='spell.id')
            .panel.text-center(v-bind:class='"panel-" + spell.family')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + spell.icon')  
                  span {{ spell.name | i18n }} 
                  span.label.label-primary {{ -spell.mana }}
              .panel-body
                img.thumbnail(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family')
                .progress
                  .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
                span.label.label-danger(v-if="spell.burn")
                  i.ra.ra-small-fire
                span.label.label-success(v-if="spell.poison")
                  i.ra.ra-droplet
                span.label.label-warning(v-if="spell.shock")
                  i.ra.ra-lightning-bolt
                span.label.label-primary(v-if="spell.freeze")
                  i.ra.ra-snowflake
                span.label.label-info(v-if="spell.stun")
                  i.ra.ra-broken-skull
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
      api.getSpells((spells) => {
        this.spells = spells;
      });
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