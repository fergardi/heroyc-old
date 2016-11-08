<template lang="pug">
  .container
    #Items
      .row
        .col-xs-12.hidden-xs
          .page-header.text-center
            h1 Items 
              small Game loot
        .col-xs-12
          form#search.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='text', class='form-control', placeholder='Find items')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-trash
        .col-md-3.col-xs-3(v-for='item in filtered')
          .panel.text-center(v-bind:class='"panel-" + item.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + item.icon')  
                span {{$t(item.name)}}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/items/" + item.type + "/" + item.image + ".png"', v-bind:class='"panel-" + item.rarity', data-toggle='tooltip', v-bind:title='item.name')
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
</template>

<script>
  import api from '../services/api'
  export default {
    name: 'Items',
    data: function() { 
      return {
        filter: '',
        items: []
      }
    },
    created: function() {
      self = this;
      api.getItems((data) => {
        self.items = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.items.filter(function(item) {
          return item.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>