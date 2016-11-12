<template lang="pug">
  .container
    #Monsters
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ 'title.monsters' | i18n }} | 
              small {{ 'subtitle.monsters' | i18n }}
        .col-xs-12
          form#title.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.monsters')")
        .col-md-3.col-xs-3(v-for='monster in filtered')
          .panel.text-center(v-bind:class='"panel-" + monster.type')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + monster.icon')
                span {{ monster.name | i18n }}
            .panel-body
              img.thumbnail.img-responsive(v-bind:src='"dist/img/monsters/" + monster.image + ".png"', v-bind:class='"panel-" + monster.type', data-toggle='tooltip', v-bind:title='monster.name')
              .progress
                .progress-bar.progress-bar-warning(v-bind:style='"width: " + monster.strength + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + monster.intelligence + "%"')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + monster.vitality + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + monster.agility + "%"')
              .progress
                .progress-bar.progress-bar-info(v-bind:style='"width: " + monster.defense + "%"')
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  export default {
    name: 'Monsters',
    data () { 
      return {
        filter: '',
        monsters: []
      }
    },
    created () {
      api.getMonsters((data) => {
        this.monsters = data;
      });
    },
    computed: {
      filtered () {
        return this.monsters.filter((monster) => {
          return Vue.t(monster.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>