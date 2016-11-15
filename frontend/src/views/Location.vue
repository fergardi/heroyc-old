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
                img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon.image + ".png"')
                span {{ 'button.attack' | i18n }} 
                span.label.label-danger {{ player.strength }}
                span.label.label-danger(v-if="player.weapon.burn")
                  i.ra.ra-small-fire
                span.label.label-success(v-if="player.weapon.cure")
                  i.ra.ra-leaf
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
                span.label.label-success(v-if="spell.cure")
                  i.ra.ra-leaf
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
            loot: false,
            stun: false,
            freeze: false,
            cure: false,
            shock: false,
            burn: false,
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
              stun: false,
              freeze: false,
              cure: false,
              shock: false,
              burn: false,
              dead: false,
            }
          }
        }
      }
    },
    created () {
      self = this;
      api.getPlayer(this.$route.params.playerId || 1, (data) => {
        this.player.id = data.id;
        this.player.level = data.level;
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
            stun: false,
            freeze: false,
            cure: false,
            shock: false,
            burn: false,
            dead: false,
          }
        });
        notification.danger(Vue.t('alert.battle.start', { monster: Vue.t(this.location.Monster.name) }));
      });
    },
    watch: {
      'location.Monster.vitality': (value) => {
        if (value <= 0) {
          self.player.states.buttons = false;
          self.location.Monster.states.buttons = false;
          setTimeout(() => {
            self.location.Monster.states.dead = true;
            notification.success(Vue.t('alert.battle.win', { monster: Vue.t(self.location.Monster.name) }));
          }, 3000);
          setTimeout(() => {
            self.location.Monster.states.loot = true;
            self.player.experience += self.location.experience;
            self.location.experience = 0;
            notification.success(Vue.t('alert.battle.loot.experience', { experience: self.location.experience }));
            if (self.location.Spell) {
              api.addSpell(self.player.id, self.location.Spell.id);
              notification.success(Vue.t('alert.battle.loot.spell', { spell: Vue.t(self.location.Spell.name) }));
            }
            if (self.location.Recipe) {
              api.addRecipe(self.player.id, self.location.Recipe.id);
              notification.success(Vue.t('alert.battle.loot.recipe', { recipe: Vue.t(self.location.Recipe.Result.name) }));
            }
            if (self.location.Resource) {
              api.addResource(self.player.id, self.location.Resource.id, 1);
              notification.success(Vue.t('alert.battle.loot.resource', { resource: Vue.t(self.location.Resource.name) }));
            }
            if (self.location.Item) {
              api.addItem(self.player.id, self.location.Item.id);
              notification.success(Vue.t('alert.battle.loot.item', { item: Vue.t(self.location.Item.name) }));
            }
            if (self.location.Skill) {
              api.addSkill(self.player.id, self.location.Skill.id);
              notification.success(Vue.t('alert.battle.loot.skill', { skill: Vue.t(self.location.Skill.name) }));
            }
          }, 4500);
        }
      },
      'player.vitality': (value) => {
        if (value <= 0) {
          setTimeout(() => {
            notification.danger(Vue.t('alert.battle.lose'));
            self.player.states.dead = true;
          }, 3000);
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
          }, 1500);
        } else {
          defender.states.melee = true;
          var damage = attacker.strength - Math.ceil(attacker.strength * defender.defense / 100);
          notification.danger(Vue.t('alert.battle.melee', { attacker: Vue.t(attacker.name), damage: damage, defender: Vue.t(defender.name) }));
          defender.vitality = Math.max(0, defender.vitality - damage);
          setTimeout(() => {
            defender.states.melee = false;
          }, 1500);
        }
        if (attacker.vitality > 0 && defender.vitality > 0) {
          setTimeout(() => {
            attacker.states.buttons = true;
            defender.states.buttons = true;
            if (counter) this.counterattack();
          }, 3000);
        }
      },
      magic (attacker, defender, spell, counter) {
        attacker.states.buttons = false;
        defender.states.buttons = false;
        attacker.intelligence = Math.max(0, attacker.intelligence - spell.mana);
        if (spell.damage > 0) {
          defender.states.magic = true;
          notification.info(Vue.t('alert.battle.magic', { attacker: Vue.t(attacker.name), spell: Vue.t(spell.name), damage: spell.damage, defender: Vue.t(defender.name) }));
          defender.vitality = Math.max(0, defender.vitality - spell.damage);
        } else {
          attacker.states.magic = true;
          notification.success(Vue.t('alert.battle.heal', { attacker: Vue.t(attacker.name), spell: Vue.t(spell.name), heal: spell.heal }));
          attacker.vitality = Math.min(100, attacker.vitality + spell.heal);
        }
        setTimeout(() => {
          defender.states.magic = false;
          attacker.states.magic = false;
        }, 1500);
        if (attacker.vitality > 0 && defender.vitality > 0) {
          setTimeout(() => {
            attacker.states.buttons = true;
            defender.states.buttons = true;
            if (counter) this.counterattack();
          }, 3000);
        }
      },
      buff (attacker, defender, skill, counter) {
        attacker.states.buttons = false;
        defender.states.buttons = false;
        attacker.states.buff = true;
        notification.success(Vue.t('alert.battle.buff', { attacker: Vue.t(attacker.name), skill: Vue.t(skill.name) }));
        attacker.strength = Math.max(0, attacker.strength - skill.stamina);
        attacker.vitality = Math.min(100, attacker.vitality + skill.vitality);
        attacker.strength = Math.min(100, attacker.strength + skill.strength);
        attacker.agility = Math.min(100, attacker.agility + skill.agility);
        attacker.intelligence = Math.min(100, attacker.intelligence + skill.intelligence);
        attacker.defense = Math.min(100, attacker.defense + skill.defense);    
        setTimeout(() => {
          attacker.states.buff = false;
        }, 1500);
        if (attacker.vitality > 0 && defender.vitality > 0) {
          setTimeout(() => {
            attacker.states.buttons = true;
            defender.states.buttons = true;
            if (counter) this.counterattack();
          }, 3000);
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