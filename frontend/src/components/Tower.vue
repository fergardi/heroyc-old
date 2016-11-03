<template lang="pug">
  #Tower
    .row
      .col-xs-12
        .page-header
          h1 Tower 
            small Battle monsters for loot
    .row
      .col-xs-4
        .panel.panel-default.text-center.animated(v-bind:class='[{ flash: states.player.magic }, { zoomOut: states.player.dead }]')
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg.fa-user
              span {{player.name}}
          .panel-body
            img.thumbnail.slot(v-bind:src='"dist/img/player/" + player.image + ".png"', data-toggle='tooltip', v-bind:title='player.name')
            hr
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + vitality + "%"')
            .progress
              .progress-bar.progress-bar-primary(v-bind:style='"width: " + intelligence + "%"')
            hr
            a.list-group-item(@click='melee(strength)', v-bind:class='{disabled: states.buttons}')
              img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon + ".png"')
              span Melee
              span.label.label-danger {{strength}}
            a.list-group-item(@click='distance(strength / 2)', v-bind:class='{disabled: states.buttons}')
              img.icon(v-bind:src='"dist/img/items/distance/" + player.bow + ".png"')
              span Distance
              span.label.label-danger {{strength / 2}}
            hr
            a.list-group-item(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, {disabled: states.buttons}]', @click='magic(spell.name, spell.damage, spell.heal, spell.mana)')
              img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
              span {{spell.name}}
              span.label.label-danger {{spell.damage}}
              span.label.label-primary {{spell.mana}}
              span.label.label-success {{spell.heal}}
      .col-xs-4
        .panel.text-center.animated(v-bind:class='["panel-" + tower.Spell.family, { tada: states.monster.loot }, { hidden: !states.monster.loot }]')
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg(v-bind:class='"fa-" + tower.Spell.icon')  
              span {{tower.Spell.name}}
          .panel-body
            img.thumbnail.spell(v-bind:src='"dist/img/spells/" + tower.Spell.type + "/" + tower.Spell.image + ".png"', v-bind:class='"panel-" + tower.Spell.family', data-toggle='tooltip', v-bind:title='tower.Spell.name')
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + tower.Spell.damage * 10 + "%"')
            .progress
              .progress-bar.progress-bar-success(v-bind:style='"width: " + tower.Spell.heal * 10 + "%"')
            .progress
              .progress-bar.progress-bar-primary(v-bind:style='"width: " + tower.Spell.mana * 10 + "%"')
      .col-xs-4
        .panel.text-center.animated(v-bind:class='[{ flash: states.monster.melee }, { bounce: states.monster.distance }, { shake: states.monster.magic }, { zoomOut: states.monster.dead }, "panel-" + tower.Monster.type]')
          .panel-heading
            .panel-title
              i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + tower.Monster.icon ')
              span {{tower.Monster.name}}
          .panel-body
            img.thumbnail.slot(v-bind:src='"dist/img/monsters/" + tower.Monster.image + ".png"', data-toggle='tooltip', v-bind:title='tower.Monster.name')
            hr
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + tower.Monster.vitality + "%"')
            hr
            a.list-group-item(v-for='spell in tower.Monster.Spells', v-bind:class='["list-group-item-" + spell.family]')
              img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
              span {{spell.name}}
              span.label.label-danger {{spell.damage}}
              span.label.label-primary {{spell.mana}}
              span.label.label-success {{spell.heal}}
</template>

<script>
  import factory from '../factories/factory'
  import {melee, distance, magic} from '../services/battle'
  export default {
    name: 'Tower',
    data: function() { 
      return {
        player: {
          id: 0,
          level: 0,
          name: '',
          image: 'avatar',
          weapon: 'novice',
          bow: 'novice',
          equipments: [],
          spells: []
        },
        tower: {},
        states: {
          buttons: false,
          monster: {
            melee: false,
            distance: false,
            magic: false,
            dead: false,
            loot: false
          },
          player: {
            melee: false,
            distance: false,
            magic: false,
            dead: false
          }
        }
      }
    },
    created: function() {
      self = this;
      factory.getPlayer(this.$route.params.playerId || 1, (data) => {
        self.player.id = data.id;
        self.player.level = data.level;
        self.player.equipments = data.Equipments;
        self.player.spells = data.Spells;
        self.player.image = data.image;
        self.player.name = data.name;
      });
      factory.getLocation(this.$route.params.towerId || 1, (data) => {
        self.tower = data;
        notification.danger('A wild <strong>' + self.tower.Monster.name + '</strong> appeared');
      });
    },
    watch: {
      'tower.Monster.vitality': function(value) {
        if(value <= 0) {
          self.states.buttons = true;
          setTimeout(function() {
            self.states.monster.dead = true;
            notification.success('The <strong>' + self.tower.Monster.name + '</strong> has been defeated');
          }, constants.notification.duration);
          setTimeout(function() {
            self.states.monster.loot = true;
            factory.addSpell(self.player.id, self.tower.Spell.id);
            notification.success('You looted <strong>' + self.tower.Spell.name + '</strong>');
          }, constants.notification.duration * 2);
        }
      },
      'player.vitality': function(value) {
        if(value <= 0) {
          self.states.buttons = true;
          setTimeout(function() {
            self.states.player.dead = true;
          }, constants.notification.duration);
        }
      }
    },
    methods: {
      melee: function(dmg) {
        melee(self.states, self.tower, dmg);
      },
      distance: function(dmg) {
        distance(self.states, self.tower, dmg);
      },
      magic: function(name, dmg, heal, mana){
        magic(self.states, self.tower, self.player, name, dmg, heal, mana);
      }
    },
    computed: {
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

<style scoped>
</style>