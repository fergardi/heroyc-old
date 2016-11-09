<template lang="pug">
  .container
    #Location
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ $t(location.type) }} | 
              small {{ $t('subtitle.location') }}
      .row#battle
        .col-xs-6
          .panel.panel-default.text-center.animated(v-bind:class='[{ shake: player.states.melee }, { bounce: player.states.buff }, { zoomOut: player.states.dead }, { jello: player.states.dodge }, { flash: player.states.magic }]')
            .panel-heading
              .panel-title
                i.ra.ra-lg.ra-fw.ra-player-king
                span {{player.name}} 
                label.badge {{player.level}}
            .panel-body
              .row.vertical-align
                .col-xs-4
                  img.thumbnail.slot(v-bind:src='"dist/img/player/" + player.image + ".png"')
                .col-xs-8
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + player.strength + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + player.intelligence + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + player.vitality + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + player.agility + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + player.defense + "%"')
                  .progress
                    .progress-bar.progress-bar-default(v-bind:style='"width: " + player.experience * 100 / (player.level * 1000) + "%"')
              br
              a.list-group-item.pointer(v-bind:class='{disabled: player.states.buttons}', @click='melee(player, location.Monster, true)')
                img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon + ".png"')
                span {{ $t('button.attack') }} 
                span.label.label-danger {{player.strength}}
              a.list-group-item.pointer(v-for='skill in player.skills', v-bind:class='["list-group-item-" + skill.family, { disabled: player.states.buttons || skill.stamina > player.strength }]', @click='buff(player, location.Monster, skill, true)')
                img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                span {{ $t(skill.name) }} 
                span.label.label-warning(v-if='skill.strength > 0') {{skill.strength}}
                span.label.label-primary(v-if='skill.intelligence > 0') {{skill.intelligence}}
                span.label.label-danger(v-if='skill.vitality > 0') {{skill.vitality}}
                span.label.label-success(v-if='skill.agility > 0') {{skill.agility}}
                span.label.label-info(v-if='skill.defense > 0') {{skill.defense}}
                span.label.label-warning(v-if='skill.stamina > 0') {{skill.stamina}}
              a.list-group-item.pointer(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, { disabled: player.states.buttons || spell.mana > player.intelligence }]', @click='magic(player, location.Monster, spell, true)')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{ $t(spell.name) }} 
                span.label.label-danger(v-if='spell.damage > 0') {{spell.damage}}
                span.label.label-primary(v-if='spell.mana > 0') {{spell.mana}}
                span.label.label-success(v-if='spell.heal > 0') {{spell.heal}}
        .col-xs-6
          .panel.text-center.animated(v-bind:class='["panel-" + location.Item.rarity, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Item')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Item.icon')  
                span {{ $t(location.Item.name) }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/items/" + location.Item.type + "/" + location.Item.image + ".png"', v-bind:class='"panel-" + location.Item.rarity', data-toggle='tooltip', v-bind:title='location.Item.name')
              .progress
                .progress-bar.progress-bar-warning(v-bind:style='"width: " + location.Item.strength * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Item.intelligence * 10 + "%"')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Item.vitality * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Item.agility * 10 + "%"')
              .progress
                .progress-bar.progress-bar-info(v-bind:style='"width: " + location.Item.defense * 10 + "%"')
          .panel.text-center.animated(v-bind:class='["panel-" + location.Recipe.Result.rarity, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Recipe')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Recipe.Result.icon')  
                span {{ $t(location.Recipe.Result.name) }}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/items/" + location.Recipe.Original.type + "/" + location.Recipe.Original.image + ".png"', v-bind:class='"panel-" + location.Recipe.Original.rarity')
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/resources/" + location.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + location.Recipe.Resource.family')
              .row
                .col-xs-6-col-xs-offset-6
                  img.thumbnail(v-bind:src='"dist/img/items/" + location.Recipe.Result.type + "/" + location.Recipe.Result.image + ".png"', v-bind:class='"panel-" + location.Recipe.Result.rarity')
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + location.Recipe.Result.strength * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Recipe.Result.intelligence * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Recipe.Result.vitality * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Recipe.Result.agility * 10 + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + location.Recipe.Result.defense * 10 + "%"')
          .panel.text-center.animated(v-bind:class='["panel-" + location.Resource.rarity, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Resource')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Resource.icon')  
                span {{ $t(location.Resource.name) }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/resources/" + location.Resource.image + ".png"', v-bind:class='"panel-" + location.Resource.rarity')
              p {{location.Resource.description}}
          .panel.text-center.animated(v-bind:class='["panel-" + location.Spell.family, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Spell')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Spell.icon')  
                span {{ $t(location.Spell.name) }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/spells/" + location.Spell.type + "/" + location.Spell.image + ".png"', v-bind:class='"panel-" + location.Spell.family')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Spell.damage * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Spell.heal * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Spell.mana * 10 + "%"')

          .panel.text-center.animated(v-bind:class='["panel-" + location.Skill.family, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Skill')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Skill.icon')  
                span {{ $t(location.Skill.name) }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/skills/" + location.Skill.image + ".png"', v-bind:class='"panel-" + location.Skill.family')
              .progress
                .progress-bar.progress-bar-warning(v-bind:style='"width: " + location.Skill.strength * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Skill.intelligence * 10 + "%"')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Skill.vitality * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Skill.agility * 10 + "%"')
              .progress
                .progress-bar.progress-bar-info(v-bind:style='"width: " + location.Skill.defense * 10 + "%"')
          .panel.text-center.animated#monster(v-bind:class='[{ shake: location.Monster.states.melee }, { flash: location.Monster.states.magic }, { bounce: location.Monster.states.buff }, { jello: location.Monster.states.dodge }, { zoomOut: location.Monster.states.dead }, "panel-" + location.Monster.type]')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Monster.icon ')
                span {{ $t(location.Monster.name) }} 
                label.badge ?
            .panel-body
              .row.vertical-align
                .col-xs-4
                  img.thumbnail.slot(v-bind:src='"dist/img/monsters/" + location.Monster.image + ".png"')
                .col-xs-8
                  .progress
                    .progress-bar.progress-bar-warning(v-bind:style='"width: " + location.Monster.strength + "%"')
                  .progress
                    .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Monster.intelligence + "%"')
                  .progress
                    .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Monster.vitality + "%"')
                  .progress
                    .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Monster.agility + "%"')
                  .progress
                    .progress-bar.progress-bar-info(v-bind:style='"width: " + location.Monster.defense + "%"')
                  .progress
                    .progress-bar.progress-bar-default(v-bind:style='"width: " + location.experience + "%"')
              br
              a.list-group-item(v-bind:class='{disabled: location.Monster.states.buttons}')
                img.icon(v-bind:src='"dist/img/items/weapon/novicesword.png"')
                span {{ $t('button.attack') }} 
                span.label.label-danger {{location.Monster.strength}}
              a.list-group-item(v-for='skill in location.Monster.Skills', v-bind:class='["list-group-item-" + skill.family, { disabled: location.Monster.states.buttons }]')
                img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                span {{ $t(skill.name) }} 
                span.label.label-warning(v-if='skill.strength > 0') {{skill.strength}}
                span.label.label-primary(v-if='skill.intelligence > 0') {{skill.intelligence}}
                span.label.label-danger(v-if='skill.vitality > 0') {{skill.vitality}}
                span.label.label-success(v-if='skill.agility > 0') {{skill.agility}}
                span.label.label-info(v-if='skill.defense > 0') {{skill.defense}}
                span.label.label-warning(v-if='skill.stamina > 0') {{skill.stamina}}
              a.list-group-item(v-for='spell in location.Monster.Spells', v-bind:class='["list-group-item-" + spell.family, { disabled: location.Monster.states.buttons }]')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{ $t(spell.name) }} 
                span.label.label-danger(v-if='spell.damage > 0') {{spell.damage}}
                span.label.label-primary(v-if='spell.mana > 0') {{spell.mana}}
                span.label.label-success(v-if='spell.heal > 0') {{spell.heal}}
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  import notification from '../services/notification'
  export default {
    name: 'Location',
    data: function() { 
      return {
        player: {
          id: 0,
          level: 0,
          experience: 0,
          name: '',
          image: 'avatar',
          weapon: 'novicesword',
          equipments: [],
          spells: [],
          vitality: 0,
          strength: 0,
          agility: 0,
          intelligence: 0,
          defense: 0,
          states: {
            buttons: false,
            melee: false,
            dodge: false,
            magic: false,
            buff: false,
            loot: false,
            dead: false
          }
        },
        location: {
          Monster: {
            image: 'zombie',
            states: {
              buttons: false,
              melee: false,
              dodge: false,
              magic: false,
              buff: false,
              loot: false,
              dead: false
            }
          }
        }
      }
    },
    mounted: function() {
      self = this;
      api.getPlayer(this.$route.params.playerId || 1, (data) => {
        self.player.id = data.id;
        self.player.level = data.level;
        self.player.equipments = data.Equipments;
        self.player.spells = data.Spells;
        self.player.skills = data.Skills;
        self.player.image = data.image;
        self.player.name = data.name;
        self.player.weapon = data.Equipments[3].image;
        self.player.vitality = self.vitality();
        self.player.strength = self.strength();
        self.player.agility = self.agility();
        self.player.intelligence = self.intelligence();
        self.player.defense = self.defense();
      });
      api.getLocation(this.$route.params.locationId || 3, (data) => {
        self.location = data;
        // extend monster object with states after overriding
        $.extend(self.location.Monster, { 
          states: {
            buttons: false,
            melee: false,
            dodge: false,
            magic: false,
            buff: false,
            loot: false,
            dead: false
          }
        });
        setTimeout(function() {
          notification.danger(Vue.t('alert.battle.start', { monster: Vue.t(self.location.Monster.name) }));
        }, constants.notification.duration / 2);
      });
    },
    watch: {
      'location.Monster.vitality': function(value) {
        if(value <= 0) {
          self.player.states.buttons = true;
          self.location.monsters.states.buttons = true;
          setTimeout(function() {
            self.location.Monster.states.dead = true;
            notification.success(Vue.t('alert.battle.win', { monster: Vue.t(self.location.Monster.name) }));
            self.player.experience += self.location.experience;
            self.location.experience = 0;
            notification.success(Vue.t('alert.battle.loot.experience', { experience: self.location.experience }));
          }, constants.notification.duration);
          setTimeout(function() {
            self.location.Monster.states.loot = true;
            switch(self.location.image){
              case 'tower':
                api.addSpell(self.player.id, self.location.Spell.id);
                notification.success(Vue.t('alert.battle.loot.spell', { spell: Vue.t(self.location.Spell.name) }));
                break;
              case 'castle':
                api.addRecipe(self.player.id, self.location.Recipe.id);
                notification.success(Vue.t('alert.battle.loot.recipe', { recipe: Vue.t(self.location.Recipe.Result.name) }));
                break;
              case 'mine':
                api.addResource(self.player.id, self.location.Resource.id, 1);
                notification.success(Vue.t('alert.battle.loot.resource', { resource: Vue.t(self.location.Resource.name) }));
                break;
              case 'dungeon':
                api.addItem(self.player.id, self.location.Item.id);
                notification.success(Vue.t('alert.battle.loot.item', { item: Vue.t(self.location.Item.name) }));
                break;
              case 'ruins':
                api.addSkill(self.player.id, self.location.Skill.id);
                notification.success(Vue.t('alert.battle.loot.skill', { skill: Vue.t(self.location.Skill.name) }));
                break;
            }
          }, constants.notification.duration * 2);
        }
      },
      'player.vitality': function(value) {
        if(value <= 0) {
          self.player.states.buttons = true;
          self.location.Monster.states.buttons = true;
          setTimeout(function() {
            self.player.states.dead = true;
            notification.danger(Vue.t('alert.battle.lose'));
          }, constants.notification.duration);
        }
      }
    },
    methods: {
      counterattack: function() {
        var random = [
          function() { self.melee(self.location.Monster, self.player, false) },
          function() { self.magic(self.location.Monster, self.player, self.location.Monster.Spells[Math.floor(Math.random() * self.location.Monster.Spells.length)], false) },
          function() { self.buff(self.location.Monster, self.player, self.location.Monster.Skills[Math.floor(Math.random() * self.location.Monster.Skills.length)], false) }
        ];
        random[Math.floor(Math.random() * random.length)]();
      },
      melee: function(attacker, defender, counter) {
        if (!attacker.states.buttons) {
          attacker.states.buttons = true;
          defender.states.buttons = true;
          if (Math.random() * 100 < defender.agility) {
            defender.states.dodge = true;
            notification.warning(Vue.t('alert.battle.dodge', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name) }));
            setTimeout(function() {
              defender.states.dodge = false;
            }, constants.notification.duration);
          } else {
            defender.states.melee = true;
            notification.danger(Vue.t('alert.battle.melee', { attacker: Vue.t(attacker.name), strength: attacker.strength, defense: defender.defense, defender: Vue.t(defender.name) }));
            setTimeout(function() {
              defender.states.melee = false;
              defender.vitality -= Math.max(0, attacker.strength - defender.defense);
            }, constants.notification.duration);
          }
          setTimeout(function() {
            attacker.states.buttons = false;
            defender.states.buttons = false;
            if (counter) self.counterattack();
          }, constants.notification.duration * 1.5);
        }
      },
      magic: function(attacker, defender, spell, counter) {
        if (!attacker.states.buttons) {
          attacker.states.buttons = true;
          defender.states.buttons = true;
          attacker.intelligence = Math.max(0, attacker.intelligence - spell.mana);
          if (spell.damage > 0) {
            defender.states.magic = true;
            notification.info(Vue.t('alert.battle.magic', { attacker: Vue.t(attacker.name), spell: Vue.t(spell.name), damage: spell.damage, defender: Vue.t(defender.name) }));
            setTimeout(function() {
              defender.states.magic = false;
              defender.vitality -= spell.damage;
            }, constants.notification.duration);
          } else {
            attacker.states.magic = true;
            notification.success(Vue.t('alert.battle.heal', { attacker: Vue.t(attacker.name), spell: Vue.t(spell.name), heal: spell.heal }));
            setTimeout(function() {
              attacker.states.magic = false;
              attacker.vitality = Math.min(100, attacker.vitality + spell.heal);
            }, constants.notification.duration);
          }
          setTimeout(function() {
            attacker.states.buttons = false;
            defender.states.buttons = false;
            if (counter) self.counterattack();
          }, constants.notification.duration * 1.5);
        }
      },
      buff: function(attacker, defender, skill, counter) {
        if (!attacker.states.buttons) {
          attacker.states.buttons = true;
          defender.states.buttons = true;
          attacker.states.buff = true;
          notification.success(Vue.t('alert.battle.buff', { attacker: Vue.t(attacker.name), skill: Vue.t(skill.name) }));
          attacker.strength = Math.max(0, attacker.strength - skill.stamina);
          setTimeout(function() {
            attacker.states.buff = false;
            attacker.vitality = Math.min(100, attacker.vitality + skill.vitality);
            attacker.strength = Math.min(100, attacker.strength + skill.strength);
            attacker.agility = Math.min(100, attacker.agility + skill.agility);
            attacker.intelligence = Math.min(100, attacker.intelligence + skill.intelligence);
            attacker.defense = Math.min(100, attacker.defense + skill.defense);
          }, constants.notification.duration);
          setTimeout(function() {
            attacker.states.buttons = false;
            defender.states.buttons = false;
            if (counter) self.counterattack();
          }, constants.notification.duration * 1.5);
        }
      },
      strength: function() {
        var str = self.player.level;
        for(var i = 0; i < self.player.equipments.length; i++) {
          str += self.player.equipments[i].strength;
        }
        return str;
      },
      vitality: function() {
        var vit = self.player.level;
        for(var i = 0; i < self.player.equipments.length; i++) {
          vit += self.player.equipments[i].vitality;
        }
        return vit;
      },
      intelligence: function() {
        var int = self.player.level;
        for(var i = 0; i < self.player.equipments.length; i++) {
          int += self.player.equipments[i].intelligence;
        }
        return int;
      },
      agility: function() {
        var agi = self.player.level;
        for(var i = 0; i < self.player.equipments.length; i++) {
          agi += self.player.equipments[i].agility;
        }
        return agi;
      },
      defense: function() {
        var def = self.player.level;
        for(var i = 0; i < self.player.equipments.length; i++) {
          def += self.player.equipments[i].defense;
        }
        return def;
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>