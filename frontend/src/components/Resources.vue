<template lang="pug">
  .container
    #Resources
      .row
        .col-xs-12
          .page-header
            h1 Resources 
              small Random shit
        .col-xs-12
          form.form-horizontal.form-group
            .input-group
              .input-group-addon
                i.fa.fa-lg.fa-lg.fa-search
              input(v-model='filter', type='text', class='form-control', placeholder='Find resources')
              .input-group-btn
                a.btn.btn-danger(v-on:click='reset()')
                  i.fa.fa-lg.fa-lg.fa-trash
        .col-md-3.col-xs-6(v-for='resource in filtered')
          .panel.text-center(v-bind:class='"panel-" + resource.rarity')
            .panel-heading
              .panel-title
                i.ra.ra-fw.ra-lg(v-bind:class='"ra-" + resource.icon')  
                span {{resource.name}}
            .panel-body
              img.thumbnail.resource(v-bind:src='"dist/img/resources/" + resource.image + ".png"', v-bind:class='"panel-" + resource.rarity', data-toggle='tooltip', v-bind:title='resource.name')
              p {{resource.description}}
</template>

<script>
  import factory from '../factories/factory'
  export default {
    name: 'Resources',
      data: function() {
        return {
          filter: '',
          resources: []
        }
      },
      created: function() {
        self = this;
        factory.getResources((data) => {
          self.resources = data;
        });
      },
      methods: {
        reset: function() {
          self.filter = '';
        }
      },
      computed: {
        filtered: function() {
          return self.resources.filter(function(resource) {
            return resource.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
          });
        }
      }
    }
</script>

<style scoped>

</style>
