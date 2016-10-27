<template lang="pug">
  #Battle
    .row
      .col-xs-12
        .page-header
          h1 Battle 
            small Kick ass
      
</template>

<script>
  import {items} from '../services/api'
  export default {
    name: 'Items',
    data () { 
      return {
        filter: '',
        items: []
      }
    },
    created: function() {
      self = this;
      items().then((result) => {
        self.items = result.data;
      });
    },
    methods: {
      get: function() {
        $.get('http://localhost:3000/api/item', function(results) {
          self.items = results.data;
          notification.info('Items loaded from database!')
        });
      },
      reset: function() {
        self.filter = '';
      }
    },
    computed: {
      filtered: function() {
        return this.items.filter(function(item) {
          return item.name.toLowerCase().indexOf(self.filter.toLowerCase()) !== -1;
        });
      }
    }
  }
</script>

<style scoped>

</style>
