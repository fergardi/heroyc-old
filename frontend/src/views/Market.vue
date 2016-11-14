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
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.market')")
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
        .col-md-3.col-xs-4(v-for='sale in filtered')
          .panel.text-center(v-bind:class='"panel-" + sale.Item.rarity', v-if='sale.Item')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Item.icon')  
                span {{ sale.Item.name | i18n }} 
            .panel-body
              img.thumbnail.item(v-bind:src='"dist/img/items/" + sale.Item.type + "/" + sale.Item.image + ".png"', v-bind:class='"panel-" + sale.Item.rarity')
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
              button.btn.btn-success.btn-block
                i.fa.fa-lg.fa-check
                | {{ 'button.buy' | i18n }} 
                span.label.label-info {{ sale.platinum }}
          .panel.text-center(v-bind:class='"panel-" + sale.Resource.rarity', v-if='sale.Resource')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Resource.icon')  
                span {{ sale.Resource.name | i18n }} 
            .panel-body
              img.thumbnail.resource(v-bind:src='"dist/img/resources/" + sale.Resource.image + ".png"', v-bind:class='"panel-" + sale.Resource.rarity')
              button.btn.btn-success.btn-block
                i.fa.fa-lg.fa-check
                | {{ 'button.buy' | i18n }} 
                span.label.label-info {{ sale.platinum }}
          .panel.text-center(v-bind:class='"panel-" + sale.Recipe.Result.rarity', v-if='sale.Recipe')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + sale.Recipe.Result.icon')  
                span {{ sale.Recipe.Result.name | i18n }} 
            .panel-body
              .col-xs-6
                img.thumbnail.item(v-bind:src='"dist/img/items/" + sale.Recipe.Original.type + "/" + sale.Recipe.Original.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Original.rarity')
              .col-xs-6
                img.thumbnail.resource(v-bind:src='"dist/img/resources/" + sale.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Resource.family')
              .col-xs-12
                img.thumbnail.item(v-bind:src='"dist/img/items/" + sale.Recipe.Result.type + "/" + sale.Recipe.Result.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Result.rarity')
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
                button.btn.btn-success.btn-block
                  i.fa.fa-lg.fa-check 
                  | {{ 'button.buy' | i18n }} 
                  span.label.label-info {{ sale.platinum }}
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Market',
    data () { 
      return {
        filter: '',
        min: 0,
        max: 9999,
        sales: [],
      }
    },
    created () {
      api.getMarket((data) => {
        this.sales = data;
      });
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