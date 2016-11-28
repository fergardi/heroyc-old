<template lang="pug">
  #World
    .map-container
      #map
</template>

<script>
  import api from '../services/api.js'
  import notification from '../services/notification'
  import Vue from 'vue'
  export default {
    name: 'World',
    data () {
      return {
        map: null,
        current: {},
        options: {
          zoom: 15,
          center: [-5.5, 42.5],
          pitch: 45,
          token: 'pk.eyJ1IjoiZmVyZ2FyZGkiLCJhIjoiY2lxdWl1enJiMDAzaWh4bTNwY3F6MnNwdiJ9.fPkJoOfrARPtZWCj1ehyCQ',
          style: 'mapbox://styles/fergardi/civamajjq003t2imgv46s299o',
          //style: 'mapbox://styles/fergardi/cirymo82r004jgym6lh1lkgo5',
          position: 'bottom-left',
          range: 1000,
          speed: 1,
          curve: 1,
          interactive: true
        },
        avatar: null
      }
    },
    mounted () {
      this.createMap();
      api.getLocations((data) => {
        this.drawLocations(data);
      });
      setInterval(this.geoLocate(), 60000);
    },
    methods: {
      createMap () {
        mapboxgl.accessToken = this.options.token;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.options.style,
          pitch: this.options.pitch,
          zoom: this.options.zoom,
          center: this.options.center,
          interactive: this.options.interactive,
          attributionControl: { position: this.position }
        });
        this.map.on('dblclick', (e) => {
          this.updatePosition(e.lngLat);
        });
        //this.map.boxZoom.disable();
        //this.map.dragPan.disable();
        this.map.doubleClickZoom.disable();
        //this.map.scrollZoom.disable();
        this.map.keyboard.disable();
        //this.map.touchZoomRotate.disable();
      },
      geoLocate () {
        console.log('Geolocating...');
        navigator.geolocation.getCurrentPosition((position) => {
          this.updatePosition(new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude));
        });
      },
      move (position) {
        this.map.flyTo({
          center: position,
          speed: this.options.speed,
          curve: this.options.curve,
          zoom: this.options.zoom
        });
      },
      updatePosition (position) {
        if (this.avatar === null) {
          var marker = document.createElement('div');
          marker.style.zIndex = 10;
          var icon = document.createElement('img');
          icon.src = 'dist/img/player/avatar.png';
          icon.className = 'map-avatar animated infinite bounce';
          marker.appendChild(icon);
          var shadow = document.createElement('div');
          shadow.className = 'map-avatar-shadow';
          marker.appendChild(shadow);
          this.avatar = new mapboxgl.Marker(marker, { offset: [-30, -77] }).setLngLat(position).addTo(this.map);
        } else {
          this.avatar.setLngLat(position);
        }
        this.move(position);
      },
      drawLocations (locations) {
        for (var i = 0; i < locations.length; i++) {
          this.addLocation(locations[i]);
        }
      },
      addLocation (location) {
        var marker = document.createElement('div');
        marker.className = 'text-center';
        marker.id = location.id;
        marker.style.zIndex = 5;
        marker.addEventListener('click', (e) => {
          e.preventDefault();
          if (this.close(location)) {
            switch(location.image){
              case 'city':
                this.$router.push({ name: 'city' });
                break;
              case 'forge':
                this.$router.push({ name: 'forge' });
                break;
              case 'inn':
                this.$router.push({ name: 'inn' });
                break;
              case 'market':
                this.$router.push({ name: 'market' });
                break;
              case 'dungeon':
              case 'tower':
              case 'mine':
              case 'ruins':
              case 'castle':
                this.$router.push({ name: 'location', params: { locationId: location.id }});
                break;
            }  
          } else {
            notification.danger(Vue.t('alert.map.away'));
          }
        });
        var expiration = document.createElement('span');
        expiration.className = 'label label-default map-location-expiration';
        expiration.appendChild(document.createTextNode(location.createdAt));
        marker.appendChild(expiration);
        var icon = new Image();
        marker.appendChild(icon);
        icon.className = 'map-location animated';
        icon.onload = () => {
          new mapboxgl.Marker(marker, { offset: [-icon.naturalWidth/2, -icon.naturalHeight] }).setLngLat([location.lng, location.lat]).addTo(this.map);
        };
        icon.src = 'dist/img/locations/' + location.image + '.png';
      },
      close (position) {
        //console.log('The distance between ',this.avatar.getLngLat(),' and ',position,' is ',this.distance(this.avatar.getLngLat(), position));
        return this.distance(this.avatar.getLngLat(), position) <= this.options.range;
      },
      distance (point1, point2) {
        var lat1 = point1.lat;
        var lng1 = point1.lng;
        var lat2 = point2.lat;
        var lng2 = point2.lng;
        var R = 6371000;
        var x1 = lat2 - lat1;
        var dLat = this.toRad(x1);
        var x2 = lng2 - lng1;
        var dLon = this.toRad(x2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var dist = R * c;
        return dist;
      },
      toRad (deg) {
        return deg * Math.PI / 180;
      },    
      toDeg (rad) {
        return rad * 180 / Math.PI;
      }
    }
  }
</script>

<style lang="stylus">
  #map
    -webkit-user-select: none;
    width: 100%;
    height: 100%;
    min-height: 100%;
  .mapboxgl-canvas
    height: 100% !important;
  .map-location
    cursor: pointer;
    display: block;
  .map-location:hover
    -webkit-animation: tada 1s;
    animation: tada 1s;
  .map-location-expiration
    display: block;
  .map-avatar
    width: 60px;
    height: 60px;
    border-radius: 50%;
  .map-avatar-shadow
    width: 20px;
    height: 7px;
    border-radius: 50%;
    background-color: black;
    opacity: .3;
    margin: 10px auto 0 auto;
</style>