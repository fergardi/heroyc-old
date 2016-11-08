<template lang="pug">
  .container
    #Recipes
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ $t('title.recipes') }} | 
              small {{ $t('subtitle.recipes') }}
        .col-xs-12
          form#search.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='text', class='form-control', v-bind:placeholder="$t('placeholder.recipes')")
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-trash
        .col-md-3.col-xs-4(v-for='recipe in filtered')
          .panel.text-center(v-bind:class='"panel-" + recipe.Result.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + recipe.Result.icon')  
                span {{$t(recipe.Result.name)}}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Original.type + "/" + recipe.Original.image + ".png"', v-bind:class='"panel-" + recipe.Original.rarity')
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + recipe.Resource.image + ".png"', v-bind:class='"panel-" + recipe.Resource.family')
              .row
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
    data: function() { 
      return {
        filter: '',
        recipes: []
      }
    },
    created: function() {
      self = this;
      api.getRecipes((data) => {
        self.recipes = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.recipes.filter(function(recipe) {
          return (Vue.t(recipe.Original.name).toLowerCase().indexOf(self.filter.toLowerCase()) !== -1 || Vue.t(recipe.Result.name).toLowerCase().indexOf(self.filter.toLowerCase()) !== -1 || Vue.t(recipe.Resource.name).toLowerCase().indexOf(self.filter.toLowerCase()) !== -1);
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>