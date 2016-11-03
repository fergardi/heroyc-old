<template lang="pug">
  .container
    #Monsters
      .row
        .col-xs-12
          .page-header
            h1 Monsters 
              small Enemies
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='text', class='form-control', placeholder='Find monsters')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-trash
        .col-md-3.col-xs-12(v-for='monster in filtered')
          .panel.text-center(v-bind:class='"panel-" + monster.type')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + monster.icon')
                span {{monster.name}}
            .panel-body
              img.thumbnail.monster(v-bind:src='"dist/img/monsters/" + monster.image + ".png"', v-bind:class='"panel-" + monster.type', data-toggle='tooltip', v-bind:title='monster.name')
              .progress
                .progress-bar.progress-bar-warning(v-bind:style='"width: " + monster.strength * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + monster.intelligence * 10 + "%"')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + monster.vitality * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + monster.agility * 10 + "%"')
              .progress
                .progress-bar.progress-bar-info(v-bind:style='"width: " + monster.defense * 10 + "%"')
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Monsters',
    data: function() { 
      return {
        filter: '',
        monsters: []
      }
    },
    created: function() {
      self = this;
      factory.getMonsters((data) => {
        self.monsters = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.monsters.filter(function(monster) {
          return monster.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style scoped>
</style>