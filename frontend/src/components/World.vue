<template lang="pug">
  #World
    .map-container
      #map
</template>

<script>
  import factory from '../factories/factory.js'
  export default {
    name: 'World',
    data: function() {
      return {
        battles: [],
        map: {},
        current: {},
        options: {
          zoom: 13,
          center: [-5.56, 42.60],
          pitch: 60,
          token: 'pk.eyJ1IjoiZmVyZ2FyZGkiLCJhIjoiY2lxdWl1enJiMDAzaWh4bTNwY3F6MnNwdiJ9.fPkJoOfrARPtZWCj1ehyCQ',
          style: 'mapbox://styles/fergardi/cirymo82r004jgym6lh1lkgo5'
        },
        avatar: null
      }
    },
    mounted: function() {
      self = this;
      self.createMap();
      self.geoLocate();
      factory.getBattles((data) => {
        self.battles = data;
        self.refreshBattles();
      });
    },
    watch: {
      battles: function() {
        self.refreshBattles();
      }
    },
    methods: {
      createMap: function() {
        mapboxgl.accessToken = self.options.token;
        self.map = new mapboxgl.Map({
          container: 'map',
          style: self.options.style,
          pitch: self.options.pitch,
          zoom: self.options.zoom,
          center: self.options.center,
          attributionControl: { position: 'bottom-left' }
        });
      },
      geoLocate: function() {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            if (self.avatar === null) self.move(position.coords.longitude, position.coords.latitude);
            self.current = position;
            self.updatePosition(new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude));
          }
        );
      },
      move: function(lng, lat) {
        self.map.flyTo({
          center: [lng, lat],
          speed: 1,
          curve: 1,
          zoom: self.options.zoom
        });
      },
      updatePosition: function(location) {
        if (self.avatar === null) {
          var marker = document.createElement('div');
          marker.style.zIndex = 5;
          marker.style.left = -30 + 'px';
          marker.style.top = -77 + 'px';
          // add an icon
          var icon = document.createElement('img');
          icon.src = 'dist/img/player/avatar.png';
          icon.className = 'map-avatar animated bounce infinite';
          marker.appendChild(icon);
          // add a shadow
          var shadow = document.createElement('div');
          shadow.className = 'map-avatar-shadow';
          marker.appendChild(shadow);
          marker.addEventListener('click', function(event) {
            // prevent default
            event.preventDefault();
            // move to location
            self.move(location.lng, location.lat);
          });
          // add marker to map
          self.avatar = new mapboxgl.Marker(marker).setLngLat(location).addTo(self.map);
        } else {
          // move marker in map
          self.avatar.setLngLat(location);
        }
      },
      refreshBattles: function() {
        for (var i = 0; i < self.battles.length; i++) {
          self.addBattle(self.battles[i]);
        }
      },
      addBattle: function(battle) {
        // create a marker in html
        var marker = document.createElement('div');
        marker.id = battle.id;
        marker.style.zIndex = 1;
        marker.style.left = -30 + 'px';
        marker.style.top = -77 + 'px';
        // add an icon
        var icon = document.createElement('img');
        icon.src = 'dist/img/monsters/' + battle.Monster.image + '.png';
        icon.className = 'map-battle animated infinite';
        marker.appendChild(icon);
        // add a shadow
        var shadow = document.createElement('div');
        shadow.className = 'map-battle-shadow';
        marker.appendChild(shadow);
        marker.addEventListener('click', function(event) {
          self.$router.push({ name: 'battle', params: { id: battle.id }})
        });
        // add marker to map
        new mapboxgl.Marker(marker).setLngLat([battle.lat, battle.lng]).addTo(self.map);
      }
    }
  }
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
  .map-location,
  .map-battle,
  .map-avatar {
    width: 60px;
    height: 60px;
  }
  .map-resource {
    width: 30px;
    height: 30px;
    border: none;
  }
  .map-location-shadow,
  .map-battle-shadow,
  .map-resource-shadow,
  .map-avatar-shadow {
    width: 20px;
    height: 7px;
    border-radius: 50%;
    background-color: black;
    opacity: .3;
    margin: 10px auto 0 auto;
  }
  .map-avatar {
    border-radius: 50%;
  }
  /* fade */
  .map-fade {
    opacity: .75;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    position: absolute;
    margin: auto;
    pointer-events: none;
    cursor: pointer;
  }
  .map-fade-day {
    background: linear-gradient(rgba(62, 228, 216, 1) 10%, transparent 20%) left repeat;
  }
  .map-fade-night {
    background: linear-gradient(black 30%, transparent 100%) left repeat;
  }
</style>