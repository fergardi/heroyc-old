<template lang="pug">
  .container
    #Location
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 {{location.name}} 
              small Battle monsters for loot
      .row#battle
        .col-xs-6
          .panel.panel-default.text-center.animated(v-bind:class='[{ flash: states.player.buff }, { zoomOut: states.player.dead }, {rubberBand: states.player.magic}]')
            .panel-heading
              .panel-title
                i.ra.ra-lg.ra-fw.ra-player-king
                span {{player.name}} 
                label.badge {{player.level}}
            .panel-body
              .row.vertical-align
                .col-xs-4
                  img.thumbnail.slot(v-bind:src='"dist/img/player/" + player.image + ".png"', data-toggle='tooltip', v-bind:title='player.name')
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
              a.list-group-item(@click='melee(player.strength)', v-bind:class='{disabled: states.buttons}')
                img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon + ".png"')
                span Simple Attack 
                span.label.label-danger {{player.strength}}
              a.list-group-item(v-for='skill in player.skills', v-bind:class='["list-group-item-" + skill.family, {disabled: states.buttons}]', @click='buff(skill)')
                img.icon(v-bind:src='"dist/img/skills/" + skill.image + ".png"')
                span {{skill.name}} 
                span.label.label-warning(v-if='skill.strength > 0') {{skill.strength}}
                span.label.label-primary(v-if='skill.intelligence > 0') {{skill.intelligence}}
                span.label.label-danger(v-if='skill.vitality > 0') {{skill.vitality}}
                span.label.label-success(v-if='skill.agility > 0') {{skill.agility}}
                span.label.label-info(v-if='skill.defense > 0') {{skill.defense}}
              a.list-group-item(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, {disabled: states.buttons}]', @click='magic(spell)')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{spell.name}} 
                span.label.label-danger(v-if='spell.damage > 0') {{spell.damage}}
                span.label.label-primary(v-if='spell.mana > 0') {{spell.mana}}
                span.label.label-success(v-if='spell.heal > 0') {{spell.heal}}
        .col-xs-6
          .panel.text-center.animated(v-bind:class='["panel-" + location.Item.rarity, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Item')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Item.icon')  
                span {{location.Item.name}}
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
              img.thumbnail(v-bind:src='"dist/img/resources/" + location.Resource.image + ".png"', v-bind:class='"panel-" + location.Resource.rarity', data-toggle='tooltip', v-bind:title='location.Resource.name')
              p {{location.Resource.description}}
          .panel.text-center.animated(v-bind:class='["panel-" + location.Spell.family, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Spell')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Spell.icon')  
                span {{location.Spell.name}}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/spells/" + location.Spell.type + "/" + location.Spell.image + ".png"', v-bind:class='"panel-" + location.Spell.family', data-toggle='tooltip', v-bind:title='location.Spell.name')
              .progress
                .progress-bar.progress-bar-danger(v-bind:style='"width: " + location.Spell.damage * 10 + "%"')
              .progress
                .progress-bar.progress-bar-success(v-bind:style='"width: " + location.Spell.heal * 10 + "%"')
              .progress
                .progress-bar.progress-bar-primary(v-bind:style='"width: " + location.Spell.mana * 10 + "%"')
          .panel.text-center.animated(v-bind:class='["panel-" + location.Skill.family, { tada: states.monster.loot }, { hidden: !states.monster.loot }]', v-if='location.Skill')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Skill.icon')  
                span {{location.Skill.name}}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/skills/" + location.Skill.image + ".png"', v-bind:class='"panel-" + location.Skill.family', data-toggle='tooltip', v-bind:title='location.Skill.name')
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
          .panel.text-center.animated(v-bind:class='[{ rubberBand: states.monster.melee }, { bounce: states.monster.distance }, { shake: states.monster.magic }, { zoomOut: states.monster.dead }, "panel-" + location.Monster.type]')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + location.Monster.icon ')
                span {{location.Monster.name}} 
                label.badge ?
            .panel-body
              .row.vertical-align
                .col-xs-4
                  img.thumbnail.slot(v-bind:src='"dist/img/monsters/" + location.Monster.image + ".png"', data-toggle='tooltip', v-bind:title='location.Monster.name')
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
                    .progress-bar.progress-bar-default(v-bind:style='"width: 0%"')
              br
              a.list-group-item(v-for='spell in location.Monster.Spells', v-bind:class='["list-group-item-" + spell.family]')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{spell.name}}
                span.label.label-danger(v-if='spell.damage > 0') {{spell.damage}}
                span.label.label-primary(v-if='spell.mana > 0') {{spell.mana}}
                span.label.label-success(v-if='spell.heal > 0') {{spell.heal}}
</template>

<script>
  import factory from '../factories/factory'
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
          defense: 0
        },
        location: {},
        states: {
          buttons: false,
          monster: {
            melee: false,
            magic: false,
            buff: false,
            dead: false,
            loot: false
          },
          player: {
            melee: false,
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
      factory.getLocation(this.$route.params.locationId || 3, (data) => {
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
            switch(self.location.image){
              case 'tower':
                factory.addSpell(self.player.id, self.location.Spell.id);
                notification.success('You learned <strong>' + self.location.Spell.name + '</strong>');
                break;
              case 'castle':
                factory.addRecipe(self.player.id, self.location.Recipe.id);
                notification.success('You obtained a recipe for crafting <strong>' + self.location.Recipe.Result.name + '</strong>');
                break;
              case 'mine':
                factory.addResource(self.player.id, self.location.Resource.id, 1);
                notification.success('You farmed <strong>' + self.location.Resource.name + '</strong>');
                break;
              case 'dungeon':
                factory.addItem(self.player.id, self.location.Item.id);
                notification.success('You looted <strong>' + self.location.Item.name + '</strong>');
                break;
              case 'ruins':
                factory.addSkill(self.player.id, self.location.Skill.id);
                notification.success('You adquired <strong>' + self.location.Skill.name + '</strong>');
                break;
            }
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
      melee: function(damage) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.states.monster.melee = true;
          notification.danger('You inflicted <strong>-' + damage + ' Vit</strong> to the <strong>' + self.location.Monster.name + '</strong>');
          setTimeout(function(){
            self.states.buttons = false;
            self.states.monster.melee = false;
            self.location.Monster.vitality -= damage;
          }, constants.notification.duration);
        }
      },
      magic: function(spell) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.player.intelligence -= spell.mana;
          if (spell.damage === 0) {
            self.states.player.magic = true;
            notification.success('You healed <strong>+' + spell.heal + ' Vit</strong>');
            setTimeout(function(){
              self.states.buttons = false;
              self.states.player.magic = false;
              self.player.vitality += spell.heal;
            }, constants.notification.duration);
          } else {
            self.states.monster.magic = true;
            notification.info('You caused <strong>-' + spell.damage + ' Vit</strong> to the ' + self.location.Monster.name);
            setTimeout(function(){
              self.states.buttons = false;
              self.states.monster.magic = false;
              self.location.Monster.vitality -= spell.damage;
            }, constants.notification.duration);
          }
        }
      },
      buff: function(skill) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.states.player.buff = true;
          notification.success('You buffed yourself with <strong>' + skill.name + '</strong>');
          setTimeout(function(){
            self.states.buttons = false;
            self.states.player.buff = false;
            self.player.vitality += skill.vitality;
            self.player.strength += skill.strength;
            self.player.agility += skill.agility;
            self.player.intelligence += skill.intelligence;
            self.player.defense += skill.defense;
          }, constants.notification.duration);  
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