<template lang="pug">
  .container
    #Recipes
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 Recipes 
              small Coctails
        .col-xs-12
          form#search.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='text', class='form-control', placeholder='Find recipes')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-trash
        .col-md-3.col-xs-4(v-for='recipe in filtered')
          .panel.text-center(v-bind:class='"panel-" + recipe.Result.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + recipe.Result.icon')  
                span {{recipe.Result.name}}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Original.type + "/" + recipe.Original.image + ".png"', v-bind:class='"panel-" + recipe.Original.rarity', data-toggle='tooltip', v-bind:title='recipe.Original.name')
                .col-xs-6
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + recipe.Resource.image + ".png"', v-bind:class='"panel-" + recipe.Resource.family', data-toggle='tooltip', v-bind:title='recipe.Resource.name')
              .row
                .col-xs-6.col-xs-offset-3
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
            .panel-body
              button.btn.btn-success.btn-block
                i.fa.fa-lg.fa-check
                | Craft
</template>

<script>
  import factory from '../factories/factory'
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
      factory.getRecipes((data) => {
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
          return (recipe.Original.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1 || recipe.Result.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1 || recipe.Resource.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1);
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>