<template lang="pug">
  .container
    #Items
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.items' | i18n }} | 
              small {{ 'subtitle.items' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.items')")
      .row
        .col-xs-12.animated.fadeIn(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        transition-group(tag='div', enter-active-class='animated fadeIn')
          .col-xs-3(v-for='item in filtered', v-bind:key='item.id')
            .panel.text-center(v-bind:class='"panel-" + item.rarity')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + item.icon')  
                  span {{ item.name | i18n }}
              .panel-body
                img.thumbnail(v-bind:src='"dist/img/items/" + item.type + "/" + item.image + ".png"', v-bind:class='"panel-" + item.rarity')
                .progress
                  .progress-bar.progress-bar-warning(v-bind:style='"width: " + item.strength * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-primary(v-bind:style='"width: " + item.intelligence * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-danger(v-bind:style='"width: " + item.vitality * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-success(v-bind:style='"width: " + item.agility * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-info(v-bind:style='"width: " + item.defense * 10 + "%"')
                span.label.label-danger(v-if="item.burn")
                  i.ra.ra-small-fire
                span.label.label-success(v-if="item.poison")
                  i.ra.ra-droplet
                span.label.label-warning(v-if="item.shock")
                  i.ra.ra-lightning-bolt
                span.label.label-primary(v-if="item.freeze")
                  i.ra.ra-snowflake
                span.label.label-info(v-if="item.stun")
                  i.ra.ra-broken-skull
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Items',
    data () { 
      return {
        filter: '',
        items: [],
      }
    },
    created () {
      api.getItems((data) => {
        this.items = data;
      });
    },
    computed: {
      filtered () {
        return this.items.filter((item) => {
          return Vue.t(item.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>