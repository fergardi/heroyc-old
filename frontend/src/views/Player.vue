<template lang="pug">
  .container
    #Player
      .row.hidden-xs
        .col-xs-12
          .page-header
            h1 {{ 'title.player' | i18n }} | 
              small {{ 'subtitle.player' | i18n }}
      .row#title
        .col-md-6.col-xs-6
          .panel.panel-default.text-center
            .panel-heading
              .panel-title
                i.fa.fa-fw.fa-lg.fa-user
                span {{ name }} 
                span.label.label-default {{ level }} 
                span.label.label-warning {{ gold }} 
                span.label.label-info {{ platinum }} 
            .panel-body
              .row.vertical-align
                .col-xs-4
                  img.thumbnail.slot(v-bind:src='"dist/img/player/" + image + ".png"')
                .col-xs-8
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + strength + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + intelligence + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + vitality + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + agility + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + defense + "%"')
                  .progress
                    .progress-bar.progress-bar-default(v-bind:style='"width: " + experience + "%"')
            .panel-body
              .row
                .col-xs-4(v-for='equipment in equipments')
                  img.thumbnail.slot(v-bind:src='"dist/img/items/" + equipment.type + "/" + equipment.image + ".png"', v-bind:class='"panel-" + equipment.rarity')
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + equipment.strength * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + equipment.intelligence * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + equipment.vitality * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + equipment.agility * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + equipment.defense * 10 + "%"')
        .col-md-6.col-xs-6
          .panel-group(id='parent')
            .panel.panel-success.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#items')
                  i.ra.ra-fw.ra-lg.ra-crossed-axes
                  span {{ 'panel.items' | i18n }} 
                  label.badge {{ items.length }}
              .panel-collapse.collapse(id='items')
                .panel-body
                  .row
                    .col-xs-4(v-for='item in items')
                      img.thumbnail.slot.pointer(v-bind:src='"dist/img/items/" + item.type + "/" + item.image + ".png"', v-bind:class='"panel-" + item.rarity', @click='equip(item)')
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
            .panel.panel-primary.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#resources')
                  i.ra.ra-fw.ra-lg.ra-gold-bar
                  span {{ 'panel.resources' | i18n }} 
                  label.badge {{ resources.length }}
              .panel-collapse.collapse(id='resources')
                .panel-body
                  .row
                    .col-xs-4(v-for='resource in resources')
                      img.thumbnail.slot(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity')
                      br
                      label.badge {{ resource.PlayerResource.quantity }}
            .panel.panel-info.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#spells')
                  i.ra.ra-fw.ra-lg.ra-crystal-wand
                  span {{ 'panel.spells' | i18n }} 
                  label.badge {{ spells.length }}
              .panel-collapse.collapse(id='spells')
                .panel-body
                  .row
                    .col-xs-4(v-for='spell in spells')
                      img.thumbnail.slot(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family')
                      .progress
                        .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-primary(v-bind:style='"width: " + spell.mana * 10 + "%"')
            .panel.panel-warning.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#skills')
                  i.ra.ra-fw.ra-lg.ra-aura
                  span {{ 'panel.skills' | i18n }} 
                  label.badge {{ skills.length }}
              .panel-collapse.collapse(id='skills')
                .panel-body
                  .row
                    .col-xs-4(v-for='skill in skills')
                      img.thumbnail.slot(v-bind:src='"dist/img/skills/" + skill.image + ".png"', v-bind:class='"panel-" + skill.family')
                      .progress
                        .progress-bar.progress-bar-warning(v-bind:style='"width: " + skill.strength * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-primary(v-bind:style='"width: " + skill.intelligence * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-danger(v-bind:style='"width: " + skill.vitality * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-success(v-bind:style='"width: " + skill.agility * 10 + "%"')
                      .progress
                        .progress-bar.progress-bar-info(v-bind:style='"width: " + skill.defense * 10 + "%"')
            .panel.panel-danger.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#quests')
                  i.ra.ra-fw.ra-lg.ra-wooden-sign
                  span {{ 'panel.quests' | i18n }} 
                  label.badge {{ quests.length }}
              .panel-collapse.collapse(id='quests')
                .panel-body
                  .row
                    .col-xs-4(v-for='quest in quests')
                      img.thumbnail.slot(v-bind:src='"dist/img/quests/" + quest.image + ".png"', v-bind:class='"panel-" + quest.rarity')
</template>

<script>
  import api from '../services/api'
  import notification from '../services/notification'
  import Vue from 'vue'
  export default {
    name: 'Player',
      data: function() {
        return {
          id: 1,
          name: '',
          items: [],
          equipments: [],
          spells: [],
          skills: [],
          quests: [],
          resources: [],
          image: 'avatar',
          level: 0,
          experience: 0,
          gold: 0,
          platinum: 0,
        }
      },
      created: function() {
        self = this;
        api.getPlayer(1, (data) => {
          self.id = data.id;
          self.equipments = data.Equipments;
          self.items = data.Items;
          self.spells = data.Spells;
          self.skills = data.Skills;
          self.quests = data.Quests;
          self.resources = data.Resources;
          self.name = data.name;
          self.level = data.level;
          self.experience = data.experience;
          self.image = data.image;
          self.gold = data.gold;
          self.platinum = data.platinum;
        });
      },
      methods: {
        equip: function(item) {
          api.updateEquipment(self.id, item.id, (data) => {
            self.equipments = data.Equipments;
            notification.success(Vue.t('alert.inventory.equip', { item: Vue.t(item.name) }));
          });
        }
      },
      computed: {
        strength: function() {
          var str = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            str += self.equipments[i].strength;
          }
          return str;
        },
        vitality: function() {
          var vit = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            vit += self.equipments[i].vitality;
          }
          return vit;
        },
        intelligence: function() {
          var int = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            int += self.equipments[i].intelligence;
          }
          return int;
        },
        agility: function() {
          var agi = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            agi += self.equipments[i].agility;
          }
          return agi;
        },
        defense: function() {
          var def = self.level;
          for(var i = 0; i < self.equipments.length; i++) {
            def += self.equipments[i].defense;
          }
          return def;
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .panel-heading .accordion-toggle:after
    font: normal normal normal 14px/1 FontAwesome;
    content: "\f078";
    float: right;
    font-size: 1em;
    line-height: 1em;
  .panel-heading .accordion-toggle.collapsed:after
    content: "\f054";
</style>