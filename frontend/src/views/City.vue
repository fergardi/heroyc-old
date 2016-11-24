<template lang="pug">
  .container
    #City
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.city' | i18n }} | 
              small {{ 'subtitle.city' | i18n }}
      .row#title
        form.form-horizontal.form-group
          .col-xs-6
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.city')")
          .col-xs-3
            .input-group
              .input-group-addon
                i.fa.fa-chevron-right
              input(v-model='min', type='number', min='0', class='form-control', v-bind:placeholder="$t('placeholder.min')")
          .col-xs-3
            .input-group
              .input-group-addon
                i.fa.fa-chevron-left
              input(v-model='max', type='number', max='9999', class='form-control', v-bind:placeholder="$t('placeholder.max')")
      .row
        .col-xs-12.animated.fadeIn(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        transition-group(tag='div', enter-active-class='animated fadeIn', leave-active-class='animated fadeOut')
          .col-md-3.col-xs-4.slide(v-for='sale in filtered', v-bind:key='sale.id')
            .panel.text-center(v-bind:class='"panel-" + sale.Item.rarity', v-if='sale.Item')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Item.icon') 
                  span {{ sale.Item.name | i18n }} 
              .panel-body
                img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + sale.Item.type + "/" + sale.Item.image + ".png"', v-bind:class='"panel-" + sale.Item.rarity')
                .progress
                  .progress-bar.progress-bar-warning(v-bind:style='"width: " + sale.Item.strength * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-primary(v-bind:style='"width: " + sale.Item.intelligence * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-danger(v-bind:style='"width: " + sale.Item.vitality * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-success(v-bind:style='"width: " + sale.Item.agility * 10 + "%"')
                .progress
                  .progress-bar.progress-bar-info(v-bind:style='"width: " + sale.Item.defense * 10 + "%"')
                span.label.label-danger(v-if="sale.Item.burn")
                  i.ra.ra-small-fire
                span.label.label-success(v-if="sale.Item.poison")
                  i.ra.ra-droplet
                span.label.label-warning(v-if="sale.Item.shock")
                  i.ra.ra-lightning-bolt
                span.label.label-primary(v-if="sale.Item.freeze")
                  i.ra.ra-snowflake
                span.label.label-info(v-if="sale.Item.stun")
                  i.ra.ra-broken-skull
                button.btn.btn-block(v-on:click='buy(sale)', v-bind:class='sale.gold <= gold ? "btn-success" : "btn-danger disabled"')
                  i.fa.fa-lg.fa-check
                  | {{ 'button.buy' | i18n }} 
                  span.label.label-warning {{ sale.gold }}
            .panel.text-center(v-bind:class='"panel-" + sale.Resource.rarity', v-if='sale.Resource')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Resource.icon')  
                  span {{ sale.Resource.name | i18n }} 
              .panel-body
                img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + sale.Resource.image + ".png"', v-bind:class='"panel-" + sale.Resource.rarity')
                button.btn.btn-block(v-on:click='buy(sale)', v-bind:class='sale.gold <= gold ? "btn-success" : "btn-danger disabled"')
                  i.fa.fa-lg.fa-check
                  | {{ 'button.buy' | i18n }} 
                  span.label.label-warning {{ sale.gold }}
            .panel.text-center(v-bind:class='"panel-" + sale.Recipe.Result.rarity', v-if='sale.Recipe')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Recipe.Result.icon')  
                  span {{ sale.Recipe.Result.name | i18n }} 
              .panel-body
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + sale.Recipe.Original.type + "/" + sale.Recipe.Original.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Original.rarity')
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + sale.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Resource.family')
                .col-xs-12
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + sale.Recipe.Result.type + "/" + sale.Recipe.Result.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Result.rarity')
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + sale.Recipe.Result.strength * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + sale.Recipe.Result.intelligence * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + sale.Recipe.Result.vitality * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + sale.Recipe.Result.agility * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + sale.Recipe.Result.defense * 10 + "%"')
                  span.label.label-danger(v-if="sale.Recipe.Result.burn")
                    i.ra.ra-small-fire
                  span.label.label-success(v-if="sale.Recipe.Result.poison")
                    i.ra.ra-droplet
                  span.label.label-warning(v-if="sale.Recipe.Result.shock")
                    i.ra.ra-lightning-bolt
                  span.label.label-primary(v-if="sale.Recipe.Result.freeze")
                    i.ra.ra-snowflake
                  span.label.label-info(v-if="sale.Recipe.Result.stun")
                    i.ra.ra-broken-skull
                  button.btn.btn-block(v-on:click='buy(sale)', v-bind:class='sale.gold <= gold ? "btn-success" : "btn-danger disabled"')
                    i.fa.fa-lg.fa-check 
                    | {{ 'button.buy' | i18n }} 
                    span.label.label-warning {{ sale.gold }}
</template>

<script>
  import api from '../services/api'
  import authentication from '../services/authentication'
  import notification from '../services/notification'
  import VueSocketio from 'vue-socket.io'
  import Vue from 'vue'
  export default {
    name: 'City',
    data () { 
      return {
        filter: '',
        min: 0,
        max: 9999,
        sales: [],
        gold: 0
      }
    },
    created () {
      api.getPlayer(authentication.id || 1, (player) => {
        this.gold = player.gold;
        api.getSales((sales) => {
          this.sales = sales;
        });
      });
    },
    sockets:{
      connect (){
        //console.info('Socket connected, waiting for new data...');
      },
      updateSales (data) {
        //console.info('New sales incoming, updating list!')
        this.sales = data;
      }
    },
    methods: {
      buy (sale) {
        api.buySale(authentication.id || 1, sale.id, (sales) => {
          this.gold -= sale.gold;
          if (sale.Item !== null) {
            notification.success(Vue.t('alert.city.buy', { gold: sale.gold , name: Vue.t(sale.Item.name), rarity: sale.Item.rarity }));
          }
          if (sale.Resource !== null) {
            notification.success(Vue.t('alert.city.buy', { gold: sale.gold , name: Vue.t(sale.Resource.name), rarity: sale.Resource.rarity }))
          }
          if (sale.Recipe !== null) {
            notification.success(Vue.t('alert.city.buy', { gold: sale.gold , name: Vue.t(sale.Recipe.Result.name), rarity: sale.Recipe.Result.rarity }))
          }
        });
      }
    },
    computed: {
      filtered () {
        return this.sales.filter((sale) => {
          return (
            (sale.gold >= this.min && sale.gold <= this.max) && 
            (sale.Item ? 
              Vue.t(sale.Item.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 : 
              sale.Resource ? 
                Vue.t(sale.Resource.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 : 
                sale.Recipe ? 
                  Vue.t(sale.Recipe.Original.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 || 
                  Vue.t(sale.Recipe.Result.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 || 
                  Vue.t(sale.Recipe.Resource.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 : 
                  true)
          );
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>