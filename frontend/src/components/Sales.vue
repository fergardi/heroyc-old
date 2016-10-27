<template lang="pug">
  div#Sales
    .row
      .col-xs-12
        .page-header
          h1 Sales 
            small Purchase stuff
      .col-xs-12
        form.form-horizontal.form-group
          .input-group
            .input-group-addon
              i.fa.fa-lg.fa-search
            input(v-model='filter', type='text', class='form-control', placeholder='Find sales')
            .input-group-btn
              a.btn.btn-danger(v-on:click='reset()')
                i.fa.fa-lg.fa-trash
      .col-md-3.col-xs-12(v-for='sale in sales')
        template(v-if='sale.Item')
          .panel.text-center(v-bind:class='"panel-" + sale.Item.rarity')
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg(v-bind:class='"fa-" + sale.Item.icon')  
                span {{sale.Item.name}}
            .panel-body
              img.thumbnail.item(v-bind:src='"dist/img/items/" + sale.Item.type + "/" + sale.Item.image + ".png"', v-bind:class='"panel-" + sale.Item.rarity', data-toggle='tooltip', v-bind:title='sale.Item.name')
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
              .row
                .col-xs-4
                  span.badge.gold {{sale.gold}}
                .col-xs-4
                  span.badge.silver {{sale.silver}}
                .col-xs-4
                  span.badge.copper {{sale.copper}}
              .panel-body
                .row
                  button.btn.btn-success.btn-block
                    i.fa.fa-lg.fa-check
                    = 'Buy'
        template(v-if='sale.Resource')
          .panel.text-center(v-bind:class='"panel-" + sale.Resource.rarity')
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg(v-bind:class='"fa-" + sale.Resource.icon')  
                span {{sale.Resource.name}} ({{sale.quantity}})
            .panel-body
              img.thumbnail.resource(v-bind:src='"dist/img/resources/" + sale.Resource.image + ".png"', v-bind:class='"panel-" + sale.Resource.rarity', data-toggle='tooltip', v-bind:title='sale.Resource.name')
              .row
                .col-xs-4
                  span.badge.gold {{sale.gold}}
                .col-xs-4
                  span.badge.silver {{sale.silver}}
                .col-xs-4
                  span.badge.copper {{sale.copper}}
              .panel-body
                .row
                  button.btn.btn-success.btn-block
                    i.fa.fa-lg.fa-check
                    = 'Buy'
        template(v-if='sale.Recipe')
          .panel.text-center(v-bind:class='"panel-" + sale.Recipe.Result.rarity')
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg(v-bind:class='"fa-" + sale.Recipe.Result.icon')  
                span {{sale.Recipe.Result.name}}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail.item(v-bind:src='"dist/img/items/" + sale.Recipe.Original.type + "/" + sale.Recipe.Original.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Original.rarity', data-toggle='tooltip', v-bind:title='sale.Recipe.Original.name')
                .col-xs-6
                  img.thumbnail.resource(v-bind:src='"dist/img/resources/" + sale.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Resource.family', data-toggle='tooltip', v-bind:title='sale.Recipe.Resource.name')
              .row
                .col-xs-12
                  img.thumbnail.item(v-bind:src='"dist/img/items/" + sale.Recipe.Result.type + "/" + sale.Recipe.Result.image + ".png"', v-bind:class='"panel-" + sale.Recipe.Result.rarity', data-toggle='tooltip', v-bind:title='sale.Recipe.Result.name')
              .row
                .col-xs-4
                  span.badge.gold {{sale.gold}}
                .col-xs-4
                  span.badge.silver {{sale.silver}}
                .col-xs-4
                  span.badge.copper {{sale.copper}}
              .panel-body
                .row
                  button.btn.btn-success.btn-block
                    i.fa.fa-lg.fa-check 
                    = 'Buy'
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Sales',
    data () { 
      return {
        filter: '',
        sales: []
      }
    },
    created: function() {
      self = this;
      factory.getSales((data) => {
        self.sales = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.sales.filter(function(recipe) {
          return true;
        });
      }
    }
  }
</script>

<style scoped>

</style>
