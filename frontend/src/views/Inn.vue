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
      .row.equals
        .col-xs-12(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        .col-md-3.col-xs-4(v-for='quest in filtered')
          .panel.text-center(v-bind:class='"panel-" + quest.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + quest.icon')  
                span {{ quest.name | i18n }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/quests/" + quest.image + ".png"', v-bind:class='"panel-" + quest.rarity')
              .row
                .col-xs-4(v-for="resource in quest.Resources")
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity')
              span.label.label-default(v-if='quest.experience > 0') {{ quest.experience }}
              span.label.label-warning(v-if='quest.gold > 0') {{ quest.gold }}
              span.label.label-info(v-if='quest.platinum > 0') {{ quest.platinum }}
            .panel-body
              button.btn.btn-success.btn-block(v-on:click='accept(quest)')
                i.fa.fa-lg.fa-check
                | {{ 'button.accept' | i18n }}
</template>

<script>
  import api from '../services/api'
  import auth from '../services/auth'
  import notification from '../services/notification'
  import VueSocketio from 'vue-socket.io'
  import Vue from 'vue'
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
    sockets:{
      connect (){
        //console.info('Socket connected, waiting for new data...');
      },
      updateQuests (data) {
        //console.info('New quest incoming, updating list!')
        this.quests = data;
      }
    },
    methods: {
      accept (quest) {
        api.addQuest(auth.id || 1, quest.id);
        notification.success(Vue.t('alert.inn.accept', { name: Vue.t(quest.name), rarity: quest.rarity }));
      }
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