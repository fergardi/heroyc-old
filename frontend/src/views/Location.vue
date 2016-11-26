<template lang="pug">
  .container
    #Location
      .row.hidden-xs
        .col-xs-12
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
              .vertical-align
                .col-xs-4
                  img.thumbnail.img-responsive.pull-left(v-bind:src='"dist/img/player/" + player.image + ".png"')
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
              .col-xs-12
                a.list-group-item.pointer(v-bind:class='{disabled: !player.states.buttons}', @click='melee(player, location.Monster, true)')
                  img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon.image + ".png"')
                  span {{ 'button.attack' | i18n }} 
                  span.label.label-danger {{ player.strength }}
                  span.label.label-danger(v-if="player.weapon.burn")
                    i.ra.ra-small-fire
                  span.label.label-success(v-if="player.weapon.poison")
                    i.ra.ra-droplet
                  span.label.label-warning(v-if="player.weapon.shock")
                    i.ra.ra-lightning-bolt
                  span.label.label-primary(v-if="player.weapon.freeze")
                    i.ra.ra-snowflake
                  span.label.label-info(v-if="player.weapon.stun")
                    i.ra.ra-broken-skull
                a.list-group-item.pointer(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, { disabled: !player.states.buttons || spell.mana > player.intelligence }]', @click='magic(player, location.Monster, spell, true)')
                  img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                  span {{ spell.name | i18n }} 
                  span.label.label-danger(v-if='spell.damage > 0') {{ spell.damage }}
                  span.label.label-success(v-if='spell.heal > 0') {{ spell.heal }}
                  span.label.label-primary(v-if='spell.mana > 0') {{ -spell.mana }}
                  span.label.label-danger(v-if="spell.burn")
                    i.ra.ra-small-fire
                  span.label.label-success(v-if="spell.poison")
                    i.ra.ra-droplet
                  span.label.label-warning(v-if="spell.shock")
                    i.ra.ra-lightning-bolt
                  span.label.label-primary(v-if="spell.freeze")
                    i.ra.ra-snowflake
                  span.label.label-info(v-if="spell.stun")
                    i.ra.ra-broken-skull
                a.list-group-item.pointer(v-for='skill in player.skills', v-bind:class='["list-group-item-" + skill.family, { disabled: !player.states.buttons || skill.stamina > player.strength }]', @click='buff(player, location.Monster, skill, true)')
                  img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                  span {{ skill.name | i18n }} 
                  span.label.label-warning(v-if='skill.strength > 0') {{ skill.strength }}
                  span.label.label-primary(v-if='skill.intelligence > 0') {{ skill.intelligence }}
                  span.label.label-danger(v-if='skill.vitality > 0') {{ skill.vitality }}
                  span.label.label-success(v-if='skill.agility > 0') {{ skill.agility }}
                  span.label.label-info(v-if='skill.defense > 0') {{ skill.defense }}
                  span.label.label-warning(v-if='skill.stamina > 0') {{ -skill.stamina }}
        .col-xs-6
          .panel.text-center.animated.tada(v-bind:class='"panel-" + location.Item.rarity', v-if='location.Item', v-show='location.Monster.states.loot')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Item.icon')  
                span {{ location.Item.name | i18n }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/items/" + location.Item.type + "/" + location.Item.image + ".png"', v-bind:class='"panel-" + location.Item.rarity')
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
              span.label.label-danger(v-if="location.Item.burn")
                i.ra.ra-small-fire
              span.label.label-success(v-if="location.Item.poison")
                i.ra.ra-droplet
              span.label.label-warning(v-if="location.Item.shock")
                i.ra.ra-lightning-bolt
              span.label.label-primary(v-if="location.Item.freeze")
                i.ra.ra-snowflake
              span.label.label-info(v-if="location.Item.stun")
                i.ra.ra-broken-skull
          .panel.text-center.animated.tada(v-bind:class='"panel-" + location.Recipe.Result.rarity', v-if='location.Recipe', v-show='location.Monster.states.loot')
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
          .panel.text-center.animated.tada(v-bind:class='"panel-" + location.Resource.rarity', v-if='location.Resource', v-show='location.Monster.states.loot')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Resource.icon')  
                span {{ location.Resource.name | i18n }}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/resources/" + location.Resource.image + ".png"', v-bind:class='"panel-" + location.Resource.rarity')
              p {{ location.Resource.description }}
          .panel.text-center.animated.tada(v-bind:class='"panel-" + location.Spell.family', v-if='location.Spell', v-show='location.Monster.states.loot')
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
              span.label.label-danger(v-if="location.Spell.burn")
                i.ra.ra-small-fire
              span.label.label-success(v-if="location.Spell.poison")
                i.ra.ra-droplet
              span.label.label-warning(v-if="location.Spell.shock")
                i.ra.ra-lightning-bolt
              span.label.label-primary(v-if="location.Spell.freeze")
                i.ra.ra-snowflake
              span.label.label-info(v-if="location.Spell.stun")
                i.ra.ra-broken-skull
          .panel.text-center.animated.tada(v-bind:class='"panel-" + location.Skill.family', v-if='location.Skill', v-show='location.Monster.states.loot')
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
                label.badge {{ player.level }}
            .panel-body
              .vertical-align
                .col-xs-4
                  img.thumbnail.img-responsive.pull-left(v-bind:src='"dist/img/monsters/" + location.Monster.image + ".png"')
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
              .col-xs-12
                a.list-group-item(v-bind:class='{disabled: !player.states.buttons}')
                  img.icon(v-bind:src='"dist/img/items/weapon/novicesword.png"')
                  span {{ 'button.attack' | i18n }} 
                  span.label.label-danger {{location.Monster.strength}}
                a.list-group-item(v-for='spell in location.Monster.Spells', v-bind:class='["list-group-item-" + spell.family, { disabled: !player.states.buttons }]')
                  img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                  span {{ spell.name | i18n }} 
                  span.label.label-danger(v-if='spell.damage > 0') {{ spell.damage }}
                  span.label.label-success(v-if='spell.heal > 0') {{ spell.heal }}
                  span.label.label-primary(v-if='spell.mana > 0') {{ -spell.mana }}
                  span.label.label-danger(v-if="spell.burn")
                    i.ra.ra-small-fire
                  span.label.label-success(v-if="spell.poison")
                    i.ra.ra-droplet
                  span.label.label-warning(v-if="spell.shock")
                    i.ra.ra-lightning-bolt
                  span.label.label-primary(v-if="spell.freeze")
                    i.ra.ra-snowflake
                  span.label.label-info(v-if="spell.stun")
                    i.ra.ra-broken-skull
                a.list-group-item(v-for='skill in location.Monster.Skills', v-bind:class='["list-group-item-" + skill.family, { disabled: !player.states.buttons }]')
                  img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                  span {{ skill.name | i18n }} 
                  span.label.label-warning(v-if='skill.strength > 0') {{ skill.strength }}
                  span.label.label-primary(v-if='skill.intelligence > 0') {{ skill.intelligence }}
                  span.label.label-danger(v-if='skill.vitality > 0') {{ skill.vitality }}
                  span.label.label-success(v-if='skill.agility > 0') {{ skill.agility }}
                  span.label.label-info(v-if='skill.defense > 0') {{ skill.defense }}
                  span.label.label-warning(v-if='skill.stamina > 0') {{ -skill.stamina }}
</template>

<script>
  import api from '../services/api'
  import authentication from '../services/authentication'
  import notification from '../services/notification'
  import Vue from 'vue'
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
          weapon: {
            image: 'novicesword',
          },
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
            dead: false
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
              dead: false,
              loot: false
            }
          }
        }
      }
    },
    created () {
      self = this;
      api.getPlayer(authentication.id || 1, (data) => {
        this.player.id = data.id;
        this.player.level = data.level;
        this.player.experience = data.experience;
        this.player.equipments = data.Equipments;
        this.player.spells = data.Spells;
        this.player.skills = data.Skills;
        this.player.image = data.image;
        this.player.name = data.name;
        this.player.weapon = data.Equipments[3];
        this.player.vitality = this.vitality();
        this.player.strength = this.strength();
        this.player.agility = this.agility();
        this.player.intelligence = this.intelligence();
        this.player.defense = this.defense();
        api.getLocation(this.$route.params.locationId || 1, (data) => {
          this.location = data;
          this.location.Monster.vitality *= 5 * this.player.level;
          // extend monster object with states after overriding
          $.extend(this.location.Monster, { 
            states: {
              buttons: true,
              melee: false,
              dodge: false,
              magic: false,
              buff: false,
              dead: false,
              loot: false
            }
          });
          notification.danger(Vue.t('alert.battle.start', { monster: Vue.t(this.location.Monster.name) }));
        });    
      });
    },
    watch: {
      'location.Monster.vitality': (value) => {
        if (value <= 0) {
          self.location.Monster.states.dead = true;
          self.location.Monster.states.loot = true;
          notification.success(Vue.t('alert.battle.win', { monster: Vue.t(self.location.Monster.name) }));
          api.addExperience(self.player.id, self.location.experience);
          notification.success(Vue.t('alert.battle.loot.experience', { experience: self.location.experience }));
          api.addGold(self.player.id, self.location.gold);
          notification.success(Vue.t('alert.battle.loot.gold', { gold: self.location.gold }));
          if (self.location.Spell) {
            api.addSpell(self.player.id, self.location.Spell.id);
            notification.success(Vue.t('alert.battle.loot.spell', { family: self.location.Spell.family, spell: Vue.t(self.location.Spell.name) }));
          }
          if (self.location.Recipe) {
            api.addRecipe(self.player.id, self.location.Recipe.id);
            notification.success(Vue.t('alert.battle.loot.recipe', { rarity: self.location.Recipe.Result.rarity, recipe: Vue.t(self.location.Recipe.Result.name) }));
          }
          if (self.location.Resource) {
            api.addResource(self.player.id, self.location.Resource.id, 1);
            notification.success(Vue.t('alert.battle.loot.resource', { rarity: self.location.Resource.rarity, resource: Vue.t(self.location.Resource.name) }));
          }
          if (self.location.Item) {
            api.addItem(self.player.id, self.location.Item.id);
            notification.success(Vue.t('alert.battle.loot.item', { rarity: self.location.Item.rarity, item: Vue.t(self.location.Item.name) }));
          }
          if (self.location.Skill) {
            api.addSkill(self.player.id, self.location.Skill.id);
            notification.success(Vue.t('alert.battle.loot.skill', { family: self.location.Skill.family, skill: Vue.t(self.location.Skill.name) }));
          }
        }
      },
      'player.vitality': (value) => {
        if (value <= 0) {
          setTimeout(() => {
            notification.danger(Vue.t('alert.battle.lose'));
            self.player.states.dead = true;
          }, constants.notification.duration);
        }
      }
    },
    methods: {
      counterattack () {
        var random = [];
        random.push(() => { this.melee(this.location.Monster, this.player, false) });
        if (this.location.Monster.Spells.length > 0) {
          random.push(() => { this.magic(this.location.Monster, this.player, this.location.Monster.Spells[Math.floor(Math.random() * this.location.Monster.Spells.length)], false) });
        }
        if (this.location.Monster.Skills.length > 0) {
          random.push(() => { this.buff(this.location.Monster, this.player, this.location.Monster.Skills[Math.floor(Math.random() * this.location.Monster.Skills.length)], false) });
        }
        var response = random[Math.floor(Math.random() * random.length)];
        response();
      },
      melee (attacker, defender, counter) {
        attacker.states.buttons = false;
        defender.states.buttons = false;
        if (Math.floor(Math.random() * 100) <= defender.agility) {
          defender.states.dodge = true;
          notification.warning(Vue.t('alert.battle.dodge', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name) }));
          setTimeout(() => {
            defender.states.dodge = false;
          }, constants.notification.duration);
        } else {
          defender.states.melee = true;
          var damage = attacker.strength - Math.ceil(attacker.strength * defender.defense / 100);
          notification.danger(Vue.t('alert.battle.melee', { attacker: Vue.t(attacker.name), damage: damage, defender: Vue.t(defender.name) }));
          defender.vitality = Math.max(0, defender.vitality - damage);
          if (attacker.weapon && attacker.weapon.burn && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.vitality = Math.max(0, defender.vitality - 5);
            notification.info(Vue.t('alert.battle.burn', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (attacker.weapon && attacker.weapon.poison && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.agility = Math.max(0, defender.agility - 5);
            notification.info(Vue.t('alert.battle.poison', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (attacker.weapon && attacker.weapon.stun && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.defense = Math.max(0, defender.defense - 5);
            notification.info(Vue.t('alert.battle.stun', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (attacker.weapon && attacker.weapon.shock && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.strength = Math.max(0, defender.strength - 5);
            notification.info(Vue.t('alert.battle.shock', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (attacker.weapon && attacker.weapon.freeze && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.intelligence = Math.max(0, defender.intelligence - 5);
            notification.info(Vue.t('alert.battle.freeze', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          setTimeout(() => {
            defender.states.melee = false;
          }, constants.notification.duration);
        }
        if (attacker.vitality > 0 && defender.vitality > 0) {
          setTimeout(() => {
            attacker.states.buttons = true;
            defender.states.buttons = true;
            if (counter) this.counterattack();
          }, constants.notification.duration * 2);
        }
      },
      magic (attacker, defender, spell, counter) {
        attacker.states.buttons = false;
        defender.states.buttons = false;
        attacker.intelligence = Math.max(0, attacker.intelligence - spell.mana);
        if (spell.damage > 0) {
          defender.states.magic = true;
          notification.info(Vue.t('alert.battle.magic', { attacker: Vue.t(attacker.name), family: spell.family, spell: Vue.t(spell.name), damage: spell.damage, defender: Vue.t(defender.name) }));
          defender.vitality = Math.max(0, defender.vitality - spell.damage);
          if (spell.burn && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.vitality = Math.max(0, defender.vitality - 5);
            notification.info(Vue.t('alert.battle.burn', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (spell.poison && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.agility = Math.max(0, defender.agility - 5);
            notification.info(Vue.t('alert.battle.poison', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (spell.stun && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.defense = Math.max(0, defender.defense - 5);
            notification.info(Vue.t('alert.battle.stun', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (spell.shock && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.strength = Math.max(0, defender.strength - 5);
            notification.info(Vue.t('alert.battle.shock', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
          if (spell.freeze && Math.floor(Math.random() * 100) <= constants.condition.chance) {
            defender.intelligence = Math.max(0, defender.intelligence - 5);
            notification.info(Vue.t('alert.battle.freeze', { attacker: Vue.t(attacker.name), defender: Vue.t(defender.name), quantity: 5 }));
          }
        } else {
          attacker.states.magic = true;
          notification.success(Vue.t('alert.battle.heal', { attacker: Vue.t(attacker.name), family: spell.family, spell: Vue.t(spell.name), heal: spell.heal }));
          attacker.vitality = Math.min(100, attacker.vitality + spell.heal);
        }
        setTimeout(() => {
          defender.states.magic = false;
          attacker.states.magic = false;
        }, constants.notification.duration);
        if (attacker.vitality > 0 && defender.vitality > 0) {
          setTimeout(() => {
            attacker.states.buttons = true;
            defender.states.buttons = true;
            if (counter) this.counterattack();
          }, constants.notification.duration * 2);
        }
      },
      buff (attacker, defender, skill, counter) {
        attacker.states.buttons = false;
        defender.states.buttons = false;
        attacker.states.buff = true;
        notification.success(Vue.t('alert.battle.buff', { attacker: Vue.t(attacker.name), family: skill.family, skill: Vue.t(skill.name) }));
        attacker.strength = Math.max(0, attacker.strength - skill.stamina);
        attacker.vitality = Math.min(100, attacker.vitality + skill.vitality);
        attacker.strength = Math.min(100, attacker.strength + skill.strength);
        attacker.agility = Math.min(100, attacker.agility + skill.agility);
        attacker.intelligence = Math.min(100, attacker.intelligence + skill.intelligence);
        attacker.defense = Math.min(100, attacker.defense + skill.defense);    
        setTimeout(() => {
          attacker.states.buff = false;
        }, constants.notification.duration);
        if (attacker.vitality > 0 && defender.vitality > 0) {
          setTimeout(() => {
            attacker.states.buttons = true;
            defender.states.buttons = true;
            if (counter) this.counterattack();
          }, constants.notification.duration * 2);
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