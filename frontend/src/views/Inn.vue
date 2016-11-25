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
        .col-xs-12.animated.fadeIn(v-if='!filtered.length')
          .well.well-sm.text-center
            i.fa.fa-fw.fa-lg.fa-exclamation-triangle
            | {{ 'title.none' | i18n }}
        transition-group(tag='div', enter-active-class='animated fadeIn')
          .col-md-3.col-xs-4(v-for='quest in filtered', v-bind:key='quest.id')
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
                .btn-group.btn-block.dropup
                  button.btn.btn-success.btn-block.dropdown-toggle(data-toggle="dropdown")
                    | {{ 'button.accept' | i18n }} 
                  ul.dropdown-menu.btn-block.text-center
                    button.btn.btn-block.btn-success(v-on:click='accept(quest)')
                      | {{ 'button.confirm' | i18n }} 
                      i.fa.fa-lg.fa-check 
</template>

<script>
  import api from '../services/api'
  import authentication from '../services/authentication'
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
        api.addQuest(authentication.id || 1, quest.id);
        notification.success(Vue.t('alert.inn.accept', { name: Vue.t(quest.name), rarity: quest.rarity }));
      }
    },
    computed: {
      filtered () {
        return this.quests.filter((quest) => {
          return Vue.t(quest.name).toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>