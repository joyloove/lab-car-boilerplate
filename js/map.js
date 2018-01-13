function initMap() {
  var latitud, longitud, marcador;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: 19.4978, lng:  -99.1269 },
  });

  var myUbication = function(position){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    marcador = new google.maps.Marker({
      position: { lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });
    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }
  var error = function (error) {
    window.alert("Tu navegador no soporta la API de geolocalización");
  }

  function buscar(e) {
    e.preventDefault();
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(myUbication,error);
    }
  }

  var originPlace = document.getElementById("originInput");
  var destinationPlace = document.getElementById("destinationInput");
  new google.maps.places.Autocomplete(puntoPartida);
  new google.maps.places.Autocomplete(puntoDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionDisplay = new google.maps.DirectionsRenderer;

  var calcularRuta = function (directionsService, directionsDisplay) {
    var request = {
      origin: originInput.value,
      destination: destinationInput.value,
      travelMode: 'DRIVING'
    };
  directionsService.route(request, function(result,status) {
   if (status == 'OK') {
     var distancia = result.routes[0].legs[0].distance.value/1000;
     var duracion = result.routes[0].legs[0].duration.text;
     var costo = (distancia*3.57).tofixed(2);

     document.getElementById('calcTarifa').innerHTML="";
     document.getElementById('calcTarifa').innerHTML='Costo: $/. $(costo) <br> Duración $(duracion)}';
     directionDisplay.setDirections(result);
   }
 });
 directionDisplay.setMap(map);
 marcador.setMap(null);
  }
  window.addEventListener("load",buscar);
  document.getElementById('search').addEventListener("click",function(e){
    e.preventDefault();
    calcularRuta(directionService, directionDisplay);
  });
}
