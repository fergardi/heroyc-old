<template lang="pug">
  .container
    #Market
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.market' | i18n }} |
              small {{ 'subtitle.market' | i18n }}
      .row#title
        form.form-horizontal.form-group
          .col-xs-6
            .input-group
              .input-group-addon
                i.fa.fa-search
              input.form-control(v-model='filter', type='search', v-bind:placeholder="$t('placeholder.market')")
          .col-xs-3
            .input-group
              .input-group-addon
                i.fa.fa-chevron-right
              input.form-control(v-model='min', type='number', min='0', v-bind:placeholder="$t('placeholder.min')")
          .col-xs-3
            .input-group
              .input-group-addon
                i.fa.fa-chevron-left
              input.form-control(v-model='max', type='number', max='9999', v-bind:placeholder="$t('placeholder.max')")
      .row
        .col-xs-12.animated.fadeIn(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        transition-group(tag='div', enter-active-class='animated fadeIn')
          .col-md-3.col-xs-4(v-for='sale in filtered', v-bind:key='sale.id')
            .panel.text-center(v-bind:class='"panel-" + sale.Item.rarity', v-if='sale.Item')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Item.icon')  
                  span {{ sale.Item.name | i18n }}
              .panel-body
                img.thumbnail(v-bind:src='"dist/img/items/" + sale.Item.type + "/" + sale.Item.image + ".png"', v-bind:class='"panel-" + sale.Item.rarity')
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
                .btn-group.btn-block.dropup
                  button.btn.btn-block.dropdown-toggle(data-toggle="dropdown", v-bind:class='can(sale.platinum) ? "btn-success" : "btn-danger disabled"')
                    | {{ 'button.buy' | i18n }} 
                    span.label.label-info {{ sale.platinum }}
                  ul.dropdown-menu.btn-block.text-center
                    button.btn.btn-block(v-on:click='buy(sale)', v-bind:class='can(sale.platinum) ? "btn-success" : "btn-danger disabled"')
                      | {{ 'button.confirm' | i18n }}
                      i.fa.fa-lg.fa-check 
            .panel.text-center(v-bind:class='"panel-" + sale.Resource.rarity', v-if='sale.Resource')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Resource.icon')  
                  span {{ sale.Resource.name | i18n }}
              .panel-body
                img.thumbnail(v-bind:src='"dist/img/resources/" + sale.Resource.image + ".png"', v-bind:class='"panel-" + sale.Resource.rarity')
                .btn-group.btn-block.dropup
                  button.btn.btn-block.dropdown-toggle(data-toggle="dropdown", v-bind:class='can(sale.platinum) ? "btn-success" : "btn-danger disabled"')
                    | {{ 'button.buy' | i18n }} 
                    span.label.label-info {{ sale.platinum }}
                  ul.dropdown-menu.btn-block.text-center
                    button.btn.btn-block(v-on:click='buy(sale)', v-bind:class='can(sale.platinum) ? "btn-success" : "btn-danger disabled"')
                      | {{ 'button.confirm' | i18n }}
                      i.fa.fa-lg.fa-check 
            .panel.text-center(v-bind:class='"panel-" + sale.Recipe.Result.rarity', v-if='sale.Recipe')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Recipe.Result.icon')  
                  span {{ sale.Recipe.Result.name | i18n }}
              .panel-body
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/items/" + sale.Recipe.Original.type + "/" + sale.Recipe.Original.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Original.rarity')
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/resources/" + sale.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Resource.family')
                .col-xs-12
                  img.thumbnail(v-bind:src='"dist/img/items/" + sale.Recipe.Result.type + "/" + sale.Recipe.Result.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Result.rarity')
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
                  span.label.label-danger(v-if='sale.Recipe.Result.burn')
                    i.ra.ra-small-fire
                  span.label.label-success(v-if='sale.Recipe.Result.poison')
                    i.ra.ra-droplet
                  span.label.label-warning(v-if='sale.Recipe.Result.shock')
                    i.ra.ra-lightning-bolt
                  span.label.label-primary(v-if='sale.Recipe.Result.freeze')
                    i.ra.ra-snowflake
                  span.label.label-info(v-if='sale.Recipe.Result.stun')
                    i.ra.ra-broken-skull
                  .btn-group.btn-block.dropup
                    button.btn.btn-block.dropdown-toggle(data-toggle='dropdown', v-bind:class='can(sale.platinum) ? "btn-success" : "btn-danger disabled"')
                      | {{ 'button.buy' | i18n }} 
                      span.label.label-info {{ sale.platinum }}
                    ul.dropdown-menu.btn-block.text-center
                      button.btn.btn-block(v-on:click='buy(sale)', v-bind:class='can(sale.platinum) ? "btn-success" : "btn-danger disabled"')
                        | {{ 'button.confirm' | i18n }}
                        i.fa.fa-lg.fa-check    
      .row
        .col-xs-4(v-for='pack in packs')
          .panel.text-center(v-bind:class='"panel-" + pack.rarity')
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-paypal
                span {{ pack.name | i18n }}
            .panel-body
              .col-xs-12.space-down
                img.thumbnail(v-bind:src='"dist/img/packs/" + pack.image + ".png"', v-bind:class='"panel-" + pack.rarity')
              .col-xs-12.space-down
                span.label.label-warning {{ pack.gold }}
              .col-xs-12.space-down
                span.label.label-info {{ pack.platinum }}
              .btn-group.btn-block.dropup
                button.btn.btn-block.dropdown-toggle(data-toggle='dropdown', v-bind:class='"btn-" + pack.rarity')
                  | {{ 'button.buy' | i18n }} 
                  span.label.label-default {{ pack.euro }} €
                ul.dropdown-menu.btn-block.text-center
                  button.btn.btn-block(v-on:click='paypal(pack)', v-bind:class='"btn-" + pack.rarity')
                    | {{ 'button.confirm' | i18n }}
                    i.fa.fa-lg.fa-paypal 
</template>

<script>
  import api from '../services/api'
  import authentication from '../services/authentication'
  import notification from '../services/notification'
  import Vue from 'vue'
  export default {
    name: 'Market',
    data () { 
      return {
        filter: '',
        min: 0,
        max: 9999,
        sales: [],
        packs: [],
        platinum: 0
      }
    },
    created () {
      api.getPlayer(authentication.id || 1, (player) => {
        this.platinum = player.platinum;
      });
      api.getMarket((sales) => {
        this.sales = sales;
      });
      api.getPacks((packs) => {
        this.packs = packs;
      });
    },
    methods: {
      can (platinum) {
        return platinum <= this.platinum;
      },
      buy (sale) {
        api.buySale(authentication.id || 1, sale.id, (sales) => {
          this.platinum -= sale.platinum;
          this.sales = sales;
          if (sale.Item !== null) {
            var purchase = sale.Item.name;
          }
          if (sale.Resource !== null) {
            var purchase = sale.Resource.name;
          }
          if (sale.Recipe !== null) {
            var purchase = sale.Recipe.Result.name;
          }
          notification.success(Vue.t('alert.market.buy', { platinum: sale.platinum , name: Vue.t(purchase) }));
        });
      },
      paypal (pack) {
        api.buyPack(authentication.id || 1, pack.id, (player, pack, error) => {
          if (!error) {
            api.addGold(player.id, pack.gold);
            api.addPlatinum(player.id, pack.platinum);
            notification.success(Vue.t('alert.market.paypal', { rarity: sale.rarity, name: Vue.t(pack.name) }));
          } else {
            notification.danger(Vue.t('alert.market.error'));
          }
        })
      }
    },
    computed: {
      filtered () {
        return this.sales.filter((sale) => {
          return (
            (sale.platinum >= this.min && sale.platinum <= this.max) && 
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