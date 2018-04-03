function initMap() {
  var latitud,
    longitud,
    marker;
  var btn = document.getElementById('getRoute');

  // Initial Map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.4978,
      lng: -99.12697},
    zoom: 4
  });

  // Geolocation
  function location(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    marker = new google.maps.Marker({
      position: {lat: latitud,
        lng: longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });

    map.setZoom(17);
    map.setCenter({lat: latitud,
      lng: longitud});
  };

  var error = function(error) {
    window.alert('Tu navegador no soporta la API de geolocalizacion');
  };

  function getLocation(event) {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location, error);
    }
  }

  // Autocomplete
  var inputStarting = document.getElementById('origin-input');
  var inputDestination = document.getElementById('destination-input');

  new google.maps.places.Autocomplete(inputStarting);
  new google.maps.places.Autocomplete(inputDestination);

  // Description of route
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;

  function calcRoute(directionsService, directionsDisplay) {
    var request = {
      origin: inputStarting.value,
      destination: inputDestination.value,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function(response, status) {
      console.log(response);
      if (status === 'OK') {
        var distance = response.routes[0].legs[0].distance.value / 1000;
        console.log(distance);
        var time = response.routes[0].legs[0].duration.text;
        console.log(time);
        var price = Math.floor(distance * 6.40);
        console.log(price);
        var start = response.routes[0].legs[0].start_address;
        var end = response.routes[0].legs[0].end_address;
        document.getElementById('origin').textContent = start;
        document.getElementById('destination').textContent = end;
        document.getElementById('duration').textContent = time;
        document.getElementById('price').textContent = '$ ' + price;
        directionsDisplay.setDirections(response);
      }
    });
    directionsDisplay.setMap(map);
    marker.setMap(null);
  };

  window.addEventListener('load', getLocation);

  btn.addEventListener('click', function(event) {
    event.preventDefault();
    calcRoute(directionsService, directionsDisplay);
  });
}
