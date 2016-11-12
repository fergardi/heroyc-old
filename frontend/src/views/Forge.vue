<template lang="pug">
  .container
    #Forge
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ 'title.forge' | i18n }} | 
              small {{ 'subtitle.forge' | i18n }}
        .col-xs-12
          form#title.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.forge')")
        .col-md-3.col-xs-4(v-for='recipe in filtered')
          .panel.text-center(v-bind:class='"panel-" + recipe.Result.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + recipe.Result.icon')  
                span {{ recipe.Result.name | i18n }}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/items/" + recipe.Original.type + "/" + recipe.Original.image + ".png"', v-bind:class='"panel-" + recipe.Original.rarity', data-toggle='tooltip', v-bind:title='recipe.Original.name')
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/resources/" + recipe.Resource.image + ".png"', v-bind:class='"panel-" + recipe.Resource.family', data-toggle='tooltip', v-bind:title='recipe.Resource.name')
              .row
                .col-xs-12
                  img.thumbnail(v-bind:src='"dist/img/items/" + recipe.Result.type + "/" + recipe.Result.image + ".png"', v-bind:class='"panel-" + recipe.Result.rarity', data-toggle='tooltip', v-bind:title='recipe.Result.name')
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + recipe.Result.strength * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + recipe.Result.intelligence * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bininvoca a sad:style='"width: " + recipe.Result.vitality * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + recipe.Result.agility * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + recipe.Result.defense * 10 + "%"')
            .panel-body
              button.btn.btn-success.btn-block
                i.fa.fa-lg.fa-check
                | {{ 'button.craft' | i18n }}
</template>

<script>
  import api from '../services/api'
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
      api.getPlayer(this.$route.params.playerId || 1, (data) => {
        this.recipes = data.Recipes;
      });
    },
    computed: {
      filtered () {
        return this.recipes.filter((recipe) => {
          return (
            Vue.t(recipe.Original.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 || 
            Vue.t(recipe.Result.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 || 
            Vue.t(recipe.Resource.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          );
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>