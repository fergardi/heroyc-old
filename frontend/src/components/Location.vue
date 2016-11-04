<template lang="pug">
  .container
    #Location
      .row
        .col-xs-12
          .page-header
            h1 {{location.name}} 
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
              a.list-group-item(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, {disabled: states.buttons}]', @click='magic(spell.name, spell.damage, spell.heal, spell.mana)')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{spell.name}}
                span.label.label-danger {{spell.damage}}
                span.label.label-primary {{spell.mana}}
                span.label.label-success {{spell.heal}}
        .col-xs-4
          .panel.text-center.animated(v-bind:class='["panel-" + location.Item.rarity, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Item')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Item.icon')  
                span {{location.Item.name}}
            .panel-body
              img.thumbnail.item(v-bind:src='"dist/img/items/" + location.Item.type + "/" + location.Item.image + ".png"', v-bind:class='"panel-" + location.Item.rarity', data-toggle='tooltip', v-bind:title='location.Item.name')
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
          .panel.text-center.animated(v-bind:class='["panel-" + location.Recipe.Result.rarity, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Recipe')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Recipe.Result.icon')  
                span {{location.Recipe.Result.name}}
            .panel-body
              .row
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/items/" + location.Recipe.Original.type + "/" + location.Recipe.Original.image + ".png"', v-bind:class='"panel-" + location.Recipe.Original.rarity', data-toggle='tooltip', v-bind:title='location.Recipe.Original.name')
                .col-xs-6
                  img.thumbnail(v-bind:src='"dist/img/resources/" + location.Recipe.Resource.image + ".png"', v-bind:class='"panel-" + location.Recipe.Resource.family', data-toggle='tooltip', v-bind:title='location.Recipe.Resource.name')
              .row
                .col-xs-12
                  img.thumbnail(v-bind:src='"dist/img/items/" + location.Recipe.Result.type + "/" + location.Recipe.Result.image + ".png"', v-bind:class='"panel-" + location.Recipe.Result.rarity', data-toggle='tooltip', v-bind:title='location.Recipe.Result.name')
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
          .panel.text-center.animated(v-bind:class='["panel-" + location.Resource.rarity, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Resource')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Resource.icon')  
                span {{location.Resource.name}}
            .panel-body
              img.thumbnail.resource(v-bind:src='"dist/img/resources/" + location.Resource.image + ".png"', v-bind:class='"panel-" + location.Resource.rarity', data-toggle='tooltip', v-bind:title='location.Resource.name')
              p {{location.Resource.description}}
          .panel.text-center.animated(v-bind:class='["panel-" + location.Spell.family, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Tower')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Spell.icon')  
                span {{location.Spell.name}}
            .panel-body
              img.thumbnail.spell(v-bind:src='"dist/img/spells/" + location.Spell.type + "/" + location.Spell.image + ".png"', v-bind:class='"panel-" + location.Spell.family', data-toggle='tooltip', v-bind:title='location.Spell.name')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Spell.damage * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Spell.heal * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Spell.mana * 10 + "%"')
        .col-xs-4
          .panel.text-center.animated(v-bind:class='[{ flash: states.monster.melee }, { bounce: states.monster.distance }, { shake: states.monster.magic }, { zoomOut: states.monster.dead }, "panel-" + location.Monster.type]')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Monster.icon ')
                span {{location.Monster.name}}
            .panel-body
              img.thumbnail.slot(v-bind:src='"dist/img/monsters/" + location.Monster.image + ".png"', data-toggle='tooltip', v-bind:title='location.Monster.name')
              hr
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Monster.vitality + "%"')
              hr
              a.list-group-item(v-for='spell in location.Monster.Spells', v-bind:class='["list-group-item-" + spell.family]')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{spell.name}}
                span.label.label-danger {{spell.damage}}
                span.label.label-primary {{spell.mana}}
                span.label.label-success {{spell.heal}}
</template>

<script>
  import factory from '../factories/factory'
  import {melee, distance, magic, strength, vitality, agility, intelligence, defense} from '../services/battle'
  export default {
    name: 'Location',
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
        location: {},
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
      factory.getLocation(this.$route.params.locationId || 1, (data) => {
        self.location = data;
        setTimeout(function() {
          notification.danger('A wild <strong>' + self.location.Monster.name + '</strong> appeared');
        }, constants.notification.duration / 2);
      });
    },
    watch: {
      'location.Monster.vitality': function(value) {
        if(value <= 0) {
          self.states.buttons = true;
          setTimeout(function() {
            self.states.monster.dead = true;
            notification.success('The <strong>' + self.location.Monster.name + '</strong> has been defeated');
          }, constants.notification.duration);
          setTimeout(function() {
            self.states.monster.loot = true;
            factory.addRecipe(self.player.id, self.location.Recipe.id);
            notification.success('You looted a recipe for <strong>' + self.location.Recipe.Result.name + '</strong>');
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
        melee(self.states, self.location, dmg);
      },
      distance: function(dmg) {
        distance(self.states, self.location, dmg);
      },
      magic: function(name, dmg, heal, mana){
        magic(self.states, self.location, self.player, name, dmg, heal, mana);
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