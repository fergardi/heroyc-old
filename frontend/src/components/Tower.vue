<template lang="pug">
  div#Tower
    .row
      .col-xs-12
        .page-header
          h1 Tower 
            small Learn magic
      .col-xs-12
        form.form-horizontal.form-group
          .input-group
            .input-group-addon
              i.fa.fa-search
            input(v-model='filter', type='text', class='form-control', placeholder='Find spells')
            .input-group-btn
              a.btn.btn-danger(v-on:click='reset()')
                i.fa.fa-trash
      .col-md-3.col-xs-12(v-for='spell in filtered')
        .panel.text-center(v-bind:class='"panel-" + spell.family')
          .panel-heading
            .panel-title
              i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + spell.icon')  
              span {{spell.name}}
          .panel-body
            img.thumbnail.spell(v-bind:src='"dist/img/spells/" + spell.type + "/" + spell.image + ".png"', v-bind:class='"panel-" + spell.family', data-toggle='tooltip', v-bind:title='spell.name')
            .progress
              .progress-bar.progress-bar-danger(v-bind:style='"width: " + spell.damage * 10 + "%"')
            .progress
              .progress-bar.progress-bar-success(v-bind:style='"width: " + spell.heal * 10 + "%"')
            .progress
              .progress-bar.progress-bar-primary(v-bind:style='"width: " + spell.mana * 10 + "%"')
          .panel-body
            button.btn.btn-success.btn-block
              i.fa.fa-lg.fa-check
              | Learn
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Tower',
    data: function() { 
      return {
        filter: '',
        spells: []
      }
    },
    created: function() {
      self = this;
      factory.getLocation(this.$route.params.towerId || 1, (data) => {
        self.spells = data.Spells;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.spells.filter(function(spell) {
          return spell.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style scoped>

</style>
