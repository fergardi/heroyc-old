<template lang="pug">
  .container
    #Skills
      .row
        .col-xs-12.hidden-xs
          .page-header
            h1 Skills 
              small Combat habilities
        .col-xs-12
          form#search.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-search
              input#search(v-model='filter', type='text', class='form-control', placeholder='Find skills')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-trash
        .col-md-3.col-xs-3(v-for='skill in filtered')
          .panel.text-center(v-bind:class='"panel-" + skill.family')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + skill.icon')
                span {{skill.name}}
            .panel-body
              img.thumbnail(v-bind:src='"dist/img/skills/" + skill.image + ".png"', v-bind:class='"panel-" + skill.family', data-toggle='tooltip', v-bind:title='skill.name')
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
</template>

<script>
  import api from '../services/api'
  export default {
    name: 'Skills',
    data: function() { 
      return {
        filter: '',
        skills: []
      }
    },
    created: function() {
      self = this;
      factory.getSkills((data) => {
        self.skills = data;
      });
    },
    methods: {
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.skills.filter(function(skill) {
          return skill.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>