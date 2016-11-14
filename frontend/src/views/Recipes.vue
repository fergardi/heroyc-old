<template lang="pug">
  .container
    #Recipes
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.recipes' | i18n }} | 
              small {{ 'subtitle.recipes' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.recipes')")
      .row.equals
        .col-md-3.col-xs-4(v-for='recipe in filtered')
          .panel.text-center(v-bind:class='"panel-" + recipe.Result.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + recipe.Result.icon')  
                span {{ recipe.Result.name | i18n }}
            .panel-body
              .col-xs-6
                img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Original.type + "/" + recipe.Original.image + ".png"', v-bind:class='"panel-" + recipe.Original.rarity')
              .col-xs-6
                img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + recipe.Resource.image + ".png"', v-bind:class='"panel-" + recipe.Resource.family')
              .col-xs-12
                img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Result.type + "/" + recipe.Result.image + ".png"', v-bind:class='"panel-" + recipe.Result.rarity')
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
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Recipes',
    data () { 
      return {
        filter: '',
        recipes: []
      }
    },
    created () {
      api.getRecipes((data) => {
        this.recipes = data;
      });
    },
    computed: {
      filtered () {
        return this.recipes.filter((recipe) => {
          return (Vue.t(recipe.Original.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 || Vue.t(recipe.Result.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 || Vue.t(recipe.Resource.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>