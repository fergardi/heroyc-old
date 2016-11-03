<template lang="pug">
  #Battle
    .row
      .col-xs-12
        .page-header
          h1 Battle 
            small Kick ass
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
          .panel-body
            #parent
              .panel.list-group
                a.list-group-item(data-toggle='collapse', data-target='#attack', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-lightning-sword
                  span Attack
                #attack.collapse
                  a.list-group-item(@click='melee(strength)', v-bind:class='{disabled: states.buttons}')
                    img.icon(v-bind:src='"dist/img/items/weapon/" + player.weapon + ".png"')
                    span Melee
                    span.label.label-danger {{strength}}
                  a.list-group-item(@click='distance(strength / 2)', v-bind:class='{disabled: states.buttons}')
                    img.icon(v-bind:src='"dist/img/items/distance/" + player.bow + ".png"')
                    span Distance
                    span.label.label-danger {{strength / 2}}
                a.list-group-item(data-toggle='collapse', data-target='#magic', data-parent='#parent')
                  i.ra.ra-fw.ra-lg.ra-crystal-wand
                  span Magic
                #magic.collapse
                  a.list-group-item(v-for='spell in player.spells', v-bind:class='["list-group-item-" + spell.family, {disabled: states.buttons}]', @click='magic(spell.name, spell.damage, spell.heal, spell.mana)')
                    img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                    span {{spell.name}}
                    span.label.label-danger {{spell.damage}}
                    span.label.label-primary {{spell.mana}}
                    span.label.label-success {{spell.heal}}
      .col-xs-4
        .panel.text-center.animated(v-bind:class='["panel-" + battle.Item.rarity, { tada: states.monster.loot }, { hidden: !states.monster.loot }]')
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg(v-bind:class='"fa-" + battle.Item.icon')  
              span {{battle.Item.name}}
          .panel-body
            img.thumbnail.item(v-bind:src='"dist/img/items/" + battle.Item.type + "/" + battle.Item.image + ".png"', v-bind:class='"panel-" + battle.Item.rarity', data-toggle='tooltip', v-bind:title='battle.Item.name')
            .progress
              .progress-bar.progress-bar-warning(v-bind:style='"width: " + battle.Item.strength * 10 + "%"')
            .progress
              .progress-bar.progress-bar-primary(v-bind:style='"width: " + battle.Item.intelligence * 10 + "%"')
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + battle.Item.vitality * 10 + "%"')
            .progress
              .progress-bar.progress-bar-success(v-bind:style='"width: " + battle.Item.agility * 10 + "%"')
            .progress
              .progress-bar.progress-bar-info(v-bind:style='"width: " + battle.Item.defense * 10 + "%"')
        .panel.text-center.animated(v-bind:class='["panel-" + battle.Resource.rarity, { tada: states.monster.loot }, { hidden: !states.monster.loot }]')
          .panel-heading
            .panel-title
              i.fa.fa-fw.fa-lg(v-bind:class='"fa-" + battle.Resource.icon')  
              span {{battle.Resource.name}}
          .panel-body
            img.thumbnail.resource(v-bind:src='"dist/img/resources/" + battle.Resource.image + ".png"', v-bind:class='"panel-" + battle.Resource.rarity', data-toggle='tooltip', v-bind:title='battle.Resource.name')
            p {{battle.Resource.description}}
      .col-xs-4
        .panel.text-center.animated(v-bind:class='[{ flash: states.monster.melee }, { bounce: states.monster.distance }, { shake: states.monster.magic }, { zoomOut: states.monster.dead }, "panel-" + battle.Monster.type]')
          .panel-heading
            .panel-title
              i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + battle.Monster.icon ')
              span {{battle.Monster.name}}
          .panel-body
            img.thumbnail.slot(v-bind:src='"dist/img/monsters/" + battle.Monster.image + ".png"', data-toggle='tooltip', v-bind:title='battle.Monster.name')
            hr
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + battle.Monster.vitality + "%"')
          .panel-body
            .list-group.panel
              a.list-group-item(v-for='spell in battle.Monster.Spells', v-bind:class='["list-group-item-" + spell.family]')
                img.icon(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"')
                span {{spell.name}}
                span.label.label-danger {{spell.damage}}
                span.label.label-primary {{spell.mana}}
                span.label.label-success {{spell.heal}}
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Battle',
    data: function() { 
      return {
        player: {
          id: 0,
          level: 0,
          name: '',
          image: 'avatar',
          weapon: 'novice',
          bow: 'novice',
          items: [],
          spells: []
        },
        battle: {},
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
      factory.getPlayer(1, (data) => {
        self.player.id = data.id;
        self.player.level = data.level;
        self.player.items = data.Items;
        self.player.spells = data.Spells;
        self.player.image = data.image;
        self.player.name = data.name;
      });
      factory.getBattle(this.$route.params.id || 1, (data) => {
        self.battle = data;
        notification.danger('A wild <strong>' + self.battle.Monster.name + '</strong> appeared');
      });
    },
    watch: {
      'battle.Monster.vitality': function(value) {
        if(value <= 0) {
          self.states.buttons = true;
          setTimeout(function() {
            self.states.monster.dead = true;
            notification.success('The <strong>' + self.battle.Monster.name + '</strong> has been defeated');
          }, 1500);
          setTimeout(function() {
            self.states.monster.loot = true;
            factory.addItem(self.player.id, self.battle.Item.id);
            notification.success('You looted <strong>' + self.battle.Item.name + '</strong>');
            factory.addResource(self.player.id, self.battle.Resource.id, 1);
            notification.success('You looted <strong>' + self.battle.Resource.name + '</strong>');
          }, 4000);
        }
      },
      'player.vitality': function(value) {
        if(value <= 0) {
          self.states.buttons = true;
          setTimeout(function() {
            self.states.player.dead = true;
          }, 1500);
        }
      }
    },
    methods: {
      melee: function(dmg) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.states.monster.melee = true;
          notification.danger('You caused <strong>-' + dmg + ' Vit</strong> to the <strong>' + self.battle.Monster.name + '</strong>');
          setTimeout(function(){
            self.states.buttons = false;
            self.states.monster.melee = false;
            self.battle.Monster.vitality -= dmg;
          }, 1500);
        }
      },
      distance: function(dmg) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          self.states.monster.distance = true;
          notification.danger('You caused <strong>-' + dmg + ' Vit</strong> to the <strong>' + self.battle.Monster.name + '</strong>');
          setTimeout(function(){
            self.states.buttons = false;
            self.states.monster.distance = false;
            self.battle.Monster.vitality -= dmg;
          }, 1500);  
        }
      },
      magic: function(name, dmg, heal, mana) {
        if (!self.states.buttons) {
          self.states.buttons = true;
          dmg === 0 ? self.states.player.magic = true : self.states.monster.magic = true;
          dmg === 0 ? notification.success('You healed <strong>+' + heal + ' Vit</strong>') : notification.info('You caused <strong>-' + dmg + ' Vit</strong> to the ' + self.battle.Monster.name);
          setTimeout(function(){
            self.states.buttons = false;
            dmg === 0 ? self.states.player.magic = false : self.states.monster.magic = false;
            dmg === 0 ? self.player.vitality += heal : self.battle.Monster.vitality -= dmg;
            self.player.mana -= mana;
          }, 1500);  
        }
      }
    },
    computed: {
      strength: function() {
        var str = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          str += self.equiped[i].strength;
        }
        return str;
      },
      vitality: function() {
        var vit = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          vit += self.equiped[i].vitality;
        }
        return vit;
      },
      intelligence: function() {
        var int = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          int += self.equiped[i].intelligence;
        }
        return int;
      },
      agility: function() {
        var agi = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          agi += self.equiped[i].agility;
        }
        return agi;
      },
      defense: function() {
        var def = self.player.level;
        for(var i = 0; i < self.equiped.length; i++) {
          def += self.equiped[i].defense;
        }
        return def;
      },
      equiped: function() {
        return this.player.items.filter(function(item) {
          return item.PlayerItem.equiped;
        });
      }
    }
  }
</script>

<style scoped>
</style>