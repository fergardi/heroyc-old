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
              .vertical-align
                .col-xs-4
                  img.thumbnail.img-responsive(v-bind:src='"dist/img/player/" + image + ".png"')
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
              br
              .col-xs-4(v-for='equipment in equipments')
                img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + equipment.type + "/" + equipment.image + ".png"', v-bind:class='"panel-" + equipment.rarity')
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
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#items', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-crossed-axes
                  span {{ 'panel.items' | i18n }} 
                  label.badge {{ items.length }}
              .panel-collapse.collapse(id='items')
                .panel-body
                  .col-xs-4(v-for='item in items')
                    img.thumbnail.img-responsive.pointer(v-bind:src='"dist/img/items/" + item.type + "/" + item.image + ".png"', v-bind:class='"panel-" + item.rarity', @click='equip(item)')
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
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#resources', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-gold-bar
                  span {{ 'panel.resources' | i18n }} 
                  label.badge {{ resources.length }}
              .panel-collapse.collapse(id='resources')
                .panel-body
                  .col-xs-4(v-for='resource in resources')
                    img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity')
                    br
                    label.badge {{ resource.PlayerResource.quantity }}
            .panel.panel-info.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#spells', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-crystal-wand
                  span {{ 'panel.spells' | i18n }} 
                  label.badge {{ spells.length }}
              .panel-collapse.collapse(id='spells')
                .panel-body
                  .col-xs-4(v-for='spell in spells')
                    img.thumbnail.img-responsive(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family')
                    .progress
                      .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
                    .progress
                      .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
                    .progress
                      .progress-bar.progress-bar-primary(v-bind:style='"width: " + spell.mana * 10 + "%"')
            .panel.panel-warning.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#skills', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-aura
                  span {{ 'panel.skills' | i18n }} 
                  label.badge {{ skills.length }}
              .panel-collapse.collapse(id='skills')
                .panel-body
                  .col-xs-4(v-for='skill in skills')
                    img.thumbnail.img-responsive(v-bind:src='"dist/img/skills/" + skill.image + ".png"', v-bind:class='"panel-" + skill.family')
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
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#quests', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-wooden-sign
                  span {{ 'panel.quests' | i18n }} 
                  label.badge {{ quests.length }}
              .panel-collapse.collapse(id='quests')
                .panel-body
                  .col-xs-6(v-for='quest in quests')
                    img.thumbnail(v-bind:src='"dist/img/quests/" + quest.image + ".png"', v-bind:class='"panel-" + quest.rarity')
                    .row
                      .col-xs-4(v-for="resource in quest.Resources")
                        img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity')
                    span.label.label-default(v-if='quest.experience > 0') {{ quest.experience }}
                    span.label.label-warning(v-if='quest.gold > 0') {{ quest.gold }}
                    span.label.label-info(v-if='quest.platinum > 0') {{ quest.platinum }}
            .panel.panel-default.text-center
              .panel-heading
                .panel-title.accordion-toggle.collapsed(data-toggle='collapse', href='#recipes', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-aura
                  span {{ 'panel.recipes' | i18n }} 
                  label.badge {{ recipes.length }}
              .panel-collapse.collapse(id='recipes')
                .panel-body
                  .col-xs-6(v-for='recipe in recipes')
                    .col-xs-6
                      img.thumbnail.img-responsive(v-bind:src='"dist/img/items/" + recipe.Original.type + "/" + recipe.Original.image + ".png"', v-bind:class='"panel-" + recipe.Original.rarity', data-toggle='tooltip', v-bind:title='recipe.Original.name')
                    .col-xs-6
                      img.thumbnail.img-responsive(v-bind:src='"dist/img/resources/" + recipe.Resource.image + ".png"', v-bind:class='"panel-" + recipe.Resource.family', data-toggle='tooltip', v-bind:title='recipe.Resource.name')
                    .col-xs-12
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
                      span.label.label-danger(v-if="recipe.Result.burn")
                        i.ra.ra-small-fire
                      span.label.label-success(v-if="recipe.Result.poison")
                        i.ra.ra-droplet
                      span.label.label-warning(v-if="recipe.Result.shock")
                        i.ra.ra-lightning-bolt
                      span.label.label-primary(v-if="recipe.Result.freeze")
                        i.ra.ra-snowflake
                      span.label.label-info(v-if="recipe.Result.stun")
                        i.ra.ra-broken-skull
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
          recipes: [],
          image: 'avatar',
          level: 0,
          experience: 0,
          gold: 0,
          platinum: 0,
        }
      },
      created: function() {
        api.getPlayer(1, (data) => {
          this.id = data.id;
          this.equipments = data.Equipments;
          this.items = data.Items;
          this.spells = data.Spells;
          this.skills = data.Skills;
          this.quests = data.Quests;
          this.resources = data.Resources;
          this.recipes = data.Recipes;
          this.name = data.name;
          this.level = data.level;
          this.experience = data.experience;
          this.image = data.image;
          this.gold = data.gold;
          this.platinum = data.platinum;
        });
      },
      methods: {
        equip: function(item) {
          api.updateEquipment(this.id, item.id, (data) => {
            this.equipments = data.Equipments;
            notification.success(Vue.t('alert.inventory.equip', { item: Vue.t(item.name) }));
          });
        }
      },
      computed: {
        strength: function() {
          var str = this.level;
          for(var i = 0; i < this.equipments.length; i++) {
            str += this.equipments[i].strength;
          }
          return str;
        },
        vitality: function() {
          var vit = this.level;
          for(var i = 0; i < this.equipments.length; i++) {
            vit += this.equipments[i].vitality;
          }
          return vit;
        },
        intelligence: function() {
          var int = this.level;
          for(var i = 0; i < this.equipments.length; i++) {
            int += this.equipments[i].intelligence;
          }
          return int;
        },
        agility: function() {
          var agi = this.level;
          for(var i = 0; i < this.equipments.length; i++) {
            agi += this.equipments[i].agility;
          }
          return agi;
        },
        defense: function() {
          var def = this.level;
          for(var i = 0; i < this.equipments.length; i++) {
            def += this.equipments[i].defense;
          }
          return def;
        }
      }
    }
</script>

<style lang="stylus" scoped>
</style>