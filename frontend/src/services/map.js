let map = null;
//constants
var current = null;
var meters = 500;
var zoom = 15;
var center = [-5.56, 42.60];
var pitch = 60;
//token
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVyZ2FyZGkiLCJhIjoiY2lxdWl1enJiMDAzaWh4bTNwY3F6MnNwdiJ9.fPkJoOfrARPtZWCj1ehyCQ';

export const init = function() {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/fergardi/cirymo82r004jgym6lh1lkgo5',
    pitch: pitch,
    zoom: zoom,
    center: center,
    attributionControl: {
      position: 'bottom-left'
    }
  });
  // widgets
  map.boxZoom.disable();
  map.dragPan.disable();
  map.doubleClickZoom.disable();
  map.scrollZoom.disable();
  map.keyboard.disable();
  //map.touchZoomRotate.disable();
  // move
  function move(lng, lat) {
    map.flyTo({
      center: [lng, lat],
      speed: 1,
      curve: 1,
      zoom: zoom
    });
  }
  // goto
  map.on('click', function (event) {
    updatePosition(event.lngLat);
    move(event.lngLat.lng, event.lngLat.lat);
  });
  // ask geolocation
  function geolocation() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        if (avatar === null) move(position.coords.longitude, position.coords.latitude);
        current = position;
        updatePosition(new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude));
        //TODO update user latest position
      },
      function(error) {
        console.error(error.code + ' ' + error.message);
      }
    );
  }
  // add marker for current position
  var avatar = null;
  function updatePosition(location) {
    if (avatar === null) {
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
        move(location.lng, location.lat);
      });
      // add marker to map
      avatar = new mapboxgl.Marker(marker).setLngLat(location).addTo(map);
    } else {
        // move marker in map
        avatar.setLngLat(location);
    }
  }
  // geo calculations
  var geo = {
    // capable location
    capable: function (location) {
      return true;
    },
    // near location
    near: function (location) {
      return geo.distance(current.coords.longitude, current.coords.latitude, location.coordinates[0], location.coordinates[1]) <= meters;
    },
    // distance between two points
    distance: function (lon1, lat1, lon2, lat2) {
      var R = 6371000; // earth radius in meters
      var x1 = lat2 - lat1;
      var dLat = this._toRad(x1);
      var x2 = lon2 - lon1;
      var dLon = this._toRad(x2);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this._toRad(lat1)) * Math.cos(this._toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      dist = R * c;
      return dist;
    },
    // to radians
    _toRad: function (deg) {
      return deg * Math.PI / 180;
    },
    // to degrees
    _toDeg: function (rad) {
      return rad * 180 / Math.PI;
    }
  };
  // initial location
  geolocation();
  // force move to current position every X seconds
  //setInterval(function(){
      //geolocation();
  //}, 5000);
}