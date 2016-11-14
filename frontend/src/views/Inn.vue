<template lang="pug">
  .container
    #Inn
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.inn' | i18n }} | 
              small {{ 'subtitle.inn' | i18n }}
      .row#title
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input(v-model='filter', type='search', class='form-control', v-bind:placeholder="$t('placeholder.inn')")
      .row
        .col-md-3.col-xs-4(v-for='quest in filtered')
          .panel.text-center(v-bind:class='"panel-" + quest.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + quest.icon')  
                span {{ quest.name }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/quests/" + quest.image + ".png"', v-bind:class='"panel-" + quest.rarity', data-toggle='tooltip', v-bind:title='quest.name')
              p {{ quest.description }}
              button.btn.btn-success.btn-block
                i.fa.fa-lg.fa-check
                | {{ 'button.accept' | i18n }}
</template>

<script>
  import api from '../services/api'
  export default {
    name: 'Inn',
    data () { 
      return {
        filter: '',
        quests: [],
      }
    },
    created () {
      api.getQuests((data) => {
        this.quests = data;
      });
    },
    computed: {
      filtered () {
        return this.quests.filter((quest) => {
          return quest.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>