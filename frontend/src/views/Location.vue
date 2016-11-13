<template lang="pug">
  .container
    #Location
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{ location.type | i18n }} | 
              small {{ 'subtitle.location' | i18n }}
      .row#title
        .col-xs-6
          .panel.panel-default.text-center.animated(v-bind:class='[{ shake: player.states.melee }, { bounce: player.states.buff }, { zoomOut: player.states.dead }, { jello: player.states.dodge }, { flash: player.states.magic }]')
            .panel-heading
              .panel-title
                i.ra.ra-lg.ra-fw.ra-player-king
                span {{ player.name }} 
                label.badge {{ player.level }}
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
              a.list-group-item.pointer(v-bind:class='{disabled: !player.states.buttons}', @click='melee(player, location.Monster, true)')
                img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon + ".png"')
                span {{ 'button.attack' | i18n }} 
                span.label.label-danger {{player.strength}}
              a.list-group-item.pointer(v-for='skill in player.skills', v-bind:class='["list-group-item-" + skill.family, { disabled: !player.states.buttons || skill.stamina > player.strength }]', @click='buff(player, location.Monster, skill, true)')
                img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                span {{ skill.name | i18n }} 
                span.label.label-warning(v-if='skill.strength > 0') {{ skill.strength }}
                span.label.label-primary(v-if='skill.intelligence > 0') {{ skill.intelligence }}
                span.label.label-danger(v-if='skill.vitality > 0') {{ skill.vitality }}
                span.label.label-success(v-if='skill.agility > 0') {{ skill.agility }}
                span.label.label-info(v-if='skill.defense > 0') {{ skill.defense }}
                span.label.label-warning(v-if='skill.stamina > 0') {{ skill.stamina }}
              a.list-group-item.pointer(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, { disabled: !player.states.buttons || spell.mana > player.intelligence }]', @click='magic(player, location.Monster, spell, true)')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{ spell.name | i18n }} 
                span.label.label-danger(v-if='spell.damage > 0') {{ spell.damage }}
                span.label.label-primary(v-if='spell.mana > 0') {{ spell.mana }}
                span.label.label-success(v-if='spell.heal > 0') {{ spell.heal }}
        .col-xs-6
          .panel.text-center.animated(v-bind:class='["panel-" + location.Item.rarity, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Item')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Item.icon')  
                span {{ location.Item.name | i18n }}
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
                span {{ location.Recipe.Result.name | i18n }}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/items/" + location.Recipe.Original.type + "/" + location.Recipe.Original.image + ".png"', v-bind:class='"panel-" + location.Recipe.Original.rarity')
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/resources/" + location.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + location.Recipe.Resource.family')
              .row
                .col-xs-6.col-xs-offset-3
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
                span {{ location.Resource.name | i18n }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/resources/" + location.Resource.image + ".png"', v-bind:class='"panel-" + location.Resource.rarity')
              p {{ location.Resource.description }}
          .panel.text-center.animated(v-bind:class='["panel-" + location.Spell.family, { tada: location.Monster.states.loot }, { hidden: !location.Monster.states.loot }]', v-if='location.Spell')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Spell.icon')  
                span {{ location.Spell.name | i18n }}
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
                span {{ location.Skill.name | i18n }}
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
                span {{ location.Monster.name | i18n }} 
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
              a.list-group-item(v-bind:class='{disabled: !player.states.buttons}')
                img.icon(v-bind:src='"dist/img/items/weapon/novicesword.png"')
                span {{ 'button.attack' | i18n }} 
                span.label.label-danger {{location.Monster.strength}}
              a.list-group-item(v-for='skill in location.Monster.Skills', v-bind:class='["list-group-item-" + skill.family, { disabled: !player.states.buttons }]')
                img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                span {{ skill.name | i18n }} 
                span.label.label-warning(v-if='skill.strength > 0') {{ skill.strength }}
                span.label.label-primary(v-if='skill.intelligence > 0') {{ skill.intelligence }}
                span.label.label-danger(v-if='skill.vitality > 0') {{ skill.vitality }}
                span.label.label-success(v-if='skill.agility > 0') {{ skill.agility }}
                span.label.label-info(v-if='skill.defense > 0') {{ skill.defense }}
                span.label.label-warning(v-if='skill.stamina > 0') {{ skill.stamina }}
              a.list-group-item(v-for='spell in location.Monster.Spells', v-bind:class='["list-group-item-" + spell.family, { disabled: !player.states.buttons }]')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{ spell.name | i18n }} 
                span.label.label-danger(v-if='spell.damage > 0') {{ spell.damage }}
                span.label.label-primary(v-if='spell.mana > 0') {{ spell.mana }}
                span.label.label-success(v-if='spell.heal > 0') {{ spell.heal }}
</template>

<script>
  import api from '../services/api'
  import Vue from 'vue'
  import notification from '../services/notification'
  export default {
    name: 'Location',
    data () {
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
            buttons: true,
            melee: false,
            dodge: false,
            magic: false,
            buff: false,
            loot: false,
            dead: false,
          }
        },
        location: {
          Monster: {
            image: 'zombie',
            states: {
              buttons: true,
              melee: false,
              dodge: false,
              magic: false,
              buff: false,
              loot: false,
              dead: false,
            }
          }
        }
      }
    },
    created () {
      api.getPlayer(this.$route.params.playerId || 1, (data) => {
        this.player.id = data.id;
        this.player.level = data.level;
        this.player.equipments = data.Equipments;
        this.player.spells = data.Spells;
        this.player.skills = data.Skills;
        this.player.image = data.image;
        this.player.name = data.name;
        this.player.weapon = data.Equipments[3].image;
        this.player.vitality = this.vitality();
        this.player.strength = this.strength();
        this.player.agility = this.agility();
        this.player.intelligence = this.intelligence();
        this.player.defense = this.defense();
      });
      api.getLocation(this.$route.params.locationId || 3, (data) => {
        this.location = data;
        // extend monster object with states after overriding
        $.extend(this.location.Monster, { 
          states: {
            buttons: true,
            melee: false,
            dodge: false,
            magic: false,
            buff: false,
            loot: false,
            dead: false
          }
        });
        notification.danger(Vue.t('alert.battle.start', { monster: Vue.t(this.location.Monster.name) }));
      });
    },
    watch: {
      'location.Monster.vitality': (value) => {
        if(value <= 0) {
          this.player.states.buttons = false;
          this.location.Monster.states.buttons = false;
          this.location.Monster.states.dead = true;
          notification.success(Vue.t('alert.battle.win', { monster: Vue.t(this.location.Monster.name) }));
          this.player.experience += this.location.experience;
          this.location.experience = 0;
          notification.success(Vue.t('alert.battle.loot.experience', { experience: this.location.experience }));
          this.location.Monster.states.loot = true;
          switch(this.location.image){
            case 'tower':
              api.addSpell(this.player.id, this.location.Spell.id);
              notification.success(Vue.t('alert.battle.loot.spell', { spell: Vue.t(this.location.Spell.name) }));
              break;
            case 'castle':
              api.addRecipe(this.player.id, this.location.Recipe.id);
              notification.success(Vue.t('alert.battle.loot.recipe', { recipe: Vue.t(this.location.Recipe.Result.name) }));
              break;
            case 'mine':
              api.addResource(this.player.id, this.location.Resource.id, 1);
              notification.success(Vue.t('alert.battle.loot.resource', { resource: Vue.t(this.location.Resource.name) }));
              break;
            case 'dungeon':
              api.addItem(this.player.id, this.location.Item.id);
              notification.success(Vue.t('alert.battle.loot.item', { item: Vue.t(this.location.Item.name) }));
              break;
            case 'ruins':
              api.addSkill(this.player.id, this.location.Skill.id);
              notification.success(Vue.t('alert.battle.loot.skill', { skill: Vue.t(this.location.Skill.name) }));
              break;
          }
        }
      },
      'player.vitality': (value) => {
        if(value <= 0) {
          this.player.states.buttons = false;
          this.location.Monster.states.buttons = false;
          this.player.states.dead = true;
          this.location.Monster.states.loot = false;
          notification.danger(Vue.t('alert.battle.lose'));
        }
      }
    },
    methods: {
      counterattack () {
        var random = [
          function() { this.melee(this.location.Monster, this.player, false) },
          function() { this.magic(this.location.Monster, this.player, this.location.Monster.Spells[Math.floor(Math.random() * this.location.Monster.Spells.length)], false) },
          function() { this.buff(this.location.Monster, this.player, this.location.Monster.Skills[Math.floor(Math.random() * this.location.Monster.Skills.length)], false) }
        ];
        random[Math.floor(Math.random() * random.length)]();
      },
      melee (attacker, defender, counter) {
        if (attacker.states.buttons) {
          attacker.states.buttons = false;
          defender.states.buttons = false;
          if (Math.random() * 100 < defender.agility) {
            defender.states.dodge = true;
            defender.states.dodge = false;
            notification.warning(Vue.t('alert.battle.dodge', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name) }));
          } else {
            defender.states.melee = true;
            var damage = attacker.strength - Math.ceil(attacker.strength * defender.defense / 100);
            notification.danger(Vue.t('alert.battle.melee', { attacker: Vue.t(attacker.name), damage: damage, defender: Vue.t(defender.name) }));
            defender.states.melee = false;
            defender.vitality = Math.max(0, defender.vitality - damage);
            attacker.states.buttons = true;
            defender.states.buttons = true;
          }
          if (counter && !defender.states.dead) this.counterattack();
        }
      },
      magic (attacker, defender, spell, counter) {
        if (attacker.states.buttons) {
          attacker.states.buttons = false;
          defender.states.buttons = false;
          attacker.intelligence = Math.max(0, attacker.intelligence - spell.mana);
          if (spell.damage > 0) {
            defender.states.magic = true;
            notification.info(Vue.t('alert.battle.magic', { attacker: Vue.t(attacker.name), spell: Vue.t(spell.name), damage: spell.damage, defender: Vue.t(defender.name) }));
            defender.states.magic = false;
            defender.vitality = Math.max(0, defender.vitality - spell.damage);
            attacker.states.buttons = true;
            defender.states.buttons = true;
          } else {
            attacker.states.magic = true;
            notification.success(Vue.t('alert.battle.heal', { attacker: Vue.t(attacker.name), spell: Vue.t(spell.name), heal: spell.heal }));
            attacker.states.magic = false;
            attacker.vitality = Math.min(100, attacker.vitality + spell.heal);
            attacker.states.buttons = true;
            defender.states.buttons = true;
          }
          if (counter && !defender.states.dead) this.counterattack();
        }
      },
      buff (attacker, defender, skill, counter) {
        if (attacker.states.buttons) {
          attacker.states.buttons = false;
          defender.states.buttons = false;
          attacker.states.buff = true;
          notification.success(Vue.t('alert.battle.buff', { attacker: Vue.t(attacker.name), skill: Vue.t(skill.name) }));
          attacker.strength = Math.max(0, attacker.strength - skill.stamina);
          attacker.states.buff = false;
          attacker.vitality = Math.min(100, attacker.vitality + skill.vitality);
          attacker.strength = Math.min(100, attacker.strength + skill.strength);
          attacker.agility = Math.min(100, attacker.agility + skill.agility);
          attacker.intelligence = Math.min(100, attacker.intelligence + skill.intelligence);
          attacker.defense = Math.min(100, attacker.defense + skill.defense);    
          attacker.states.buttons = true;
          defender.states.buttons = true;    
          if (counter && !defender.states.dead) this.counterattack();
        }
      },
      strength () {
        var str = this.player.level;
        for(var i = 0; i < this.player.equipments.length; i++) {
          str += this.player.equipments[i].strength;
        }
        return str;
      },
      vitality () {
        var vit = this.player.level;
        for(var i = 0; i < this.player.equipments.length; i++) {
          vit += this.player.equipments[i].vitality;
        }
        return vit;
      },
      intelligence () {
        var int = this.player.level;
        for(var i = 0; i < this.player.equipments.length; i++) {
          int += this.player.equipments[i].intelligence;
        }
        return int;
      },
      agility () {
        var agi = this.player.level;
        for(var i = 0; i < this.player.equipments.length; i++) {
          agi += this.player.equipments[i].agility;
        }
        return agi;
      },
      defense () {
        var def = this.player.level;
        for(var i = 0; i < this.player.equipments.length; i++) {
          def += this.player.equipments[i].defense;
        }
        return def;
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>