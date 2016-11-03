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
        locations: [],
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
      factory.getLocations((data) => {
        self.locations = data;
        self.refresh();
      });
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
            self.$router.push({ name: 'player' });
          });
          // add marker to map
          self.avatar = new mapboxgl.Marker(marker).setLngLat(location).addTo(self.map);
        } else {
          // move marker in map
          self.avatar.setLngLat(location);
        }
      },
      refresh: function() {
        for (var i = 0; i < self.locations.length; i++) {
          self.addLocation(self.locations[i]);
        }
      },
      addLocation: function(location) {
        // create a marker in html
        var marker = document.createElement('div');
        marker.id = location.id;
        marker.style.zIndex = 1;
        marker.style.left = -30 + 'px';
        marker.style.top = -77 + 'px';
        // add an icon
        var icon = document.createElement('img');
        icon.src = 'dist/img/locations/' + location.image + '.png';
        icon.className = 'map-location';
        marker.appendChild(icon);
        // add a shadow
        var shadow = document.createElement('div');
        shadow.className = 'map-location-shadow';
        marker.appendChild(shadow);
        marker.addEventListener('click', function(event) {
          switch(location.image){
            case 'dungeon':
              self.$router.push({ name: 'dungeon', params: { dungeonId: location.id }});
              break;
            case 'city':
              self.$router.push({ name: 'city' });
              break;
            case 'tower':
              self.$router.push({ name: 'tower', params: { towerId: location.id }});
              break;
            case 'mine':
              self.$router.push({ name: 'mine', params: { mineId: location.id }});
              break;
            case 'castle':
              self.$router.push({ name: 'castle', params: { castleId: location.id }});
              break;
            case 'forge':
              self.$router.push({ name: 'forge' });
              break;
          }
        });
        // add marker to map
        new mapboxgl.Marker(marker).setLngLat([location.lat, location.lng]).addTo(self.map);
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
    border-radius: 50%;
  }
  .map-battle {
    background-color: rgba(0,0,0,0.4);
    border-width: 4px;
    padding: 2px;
    border-style: solid;
  }
  .map-location-shadow,
  .map-battle-shadow,
  .map-avatar-shadow {
    width: 20px;
    height: 7px;
    border-radius: 50%;
    background-color: black;
    opacity: .3;
    margin: 10px auto 0 auto;
  }
</style>