<template lang="pug">
  .container
    #Forge
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.forge' | i18n }} | 
              small {{ 'subtitle.forge' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.forge')")
      .row.equals
        .col-xs-12.animated.fadeIn(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        transition-group(tag='div', enter-active-class='animated fadeIn')
          .col-md-3.col-xs-4(v-for='recipe in filtered', v-bind:key='recipe.id')
            .panel.text-center(v-bind:class='"panel-" + recipe.Result.rarity')
              .panel-heading
                .panel-title
                  i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + recipe.Result.icon')  
                  span {{ recipe.Result.name | i18n }}
              .panel-body
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Original.type + "/" + recipe.Original.image + ".png"', v-bind:class='"panel-" + recipe.Original.rarity', data-toggle='tooltip', v-bind:title='recipe.Original.name')
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + recipe.Resource.image + ".png"', v-bind:class='"panel-" + recipe.Resource.family', data-toggle='tooltip', v-bind:title='recipe.Resource.name')
                .col-xs-12
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Result.type + "/" + recipe.Result.image + ".png"', v-bind:class='"panel-" + recipe.Result.rarity', data-toggle='tooltip', v-bind:title='recipe.Result.name')
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + recipe.Result.strength * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + recipe.Result.intelligence * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + recipe.Result.vitality * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + recipe.Result.agility * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + recipe.Result.defense * 10 + "%"')
                  span.label.label-danger(v-if="recipe.Result.burn")
                    i.ra.ra-small-fire
                  span.label.label-success(v-if="recipe.Result.poison")
                    i.ra.ra-droplet
                  span.label.label-warning(v-if="recipe.Result.shock")
                    i.ra.ra-lightning-bolt
                  span.label.label-primary(v-if="recipe.Result.freeze")
                    i.ra.ra-snowflake
                  span.label.label-info(v-if="recipe.Result.stun")
                    i.ra.ra-broken-skull
                .btn-group.btn-block.dropup
                  button.btn.btn-block.dropdown-toggle(data-toggle="dropdown", v-bind:class='true ? "btn-success" : "btn-danger disabled"')
                    | {{ 'button.craft' | i18n }} 
                    span.label.label-warning {{ sale.gold }} 
                  ul.dropdown-menu.btn-block.text-center
                    button.btn.btn-block.btn-success(v-on:click='craft(recipe)')
                      | {{ 'button.confirm' | i18n }} 
                      i.fa.fa-lg.fa-check      
</template>

<script>
  import api from '../services/api'
  import authentication from '../services/authentication'
  import notification from '../services/notification'
  import Vue from 'vue'
  export default {
    name: 'Forge',
    data () { 
      return {
        filter: '',
        recipes: [],
      }
    },
    created () {
      api.getPlayer(authentication.id || 1, (data) => {
        this.recipes = data.Recipes;
      });
    },
    methods: {
      craft (recipe) {
        notification.success(Vue.t('alert.forge.craft', { original: Vue.t(recipe.Original.name), originalRarity: recipe.Original.rarity, resource: Vue.t(recipe.Resource.name), resourceRarity: recipe.Resource.rarity, result: Vue.t(recipe.Result.name), resultRarity: recipe.Result.rarity }));
      }
    },
    computed: {
      filtered () {
        return this.recipes.filter((recipe) => {
          return (Vue.t(recipe.Result.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>