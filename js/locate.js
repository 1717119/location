$( document ).ready( function() {
	var $long = $( '#long' ),
	$lat = $( '#lat' ),
	$container = $( '#container' ),
	xhr,
	resp,
	respJson;

	function displayMap() {
		console.log( resp );
		img = document.createElement( 'img' );
		img.setAttribute( 'src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&markers=color:blue%7Clabel:J%7C' + latitude + ',' + longitude + '&zoom=18&size=500x300&sensor=false' );
		$container[0].appendChild( img );
	}

	function findUser() {
		xhr = new XMLHttpRequest();
		xhr.open( 'GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true', true );
		xhr.onreadystatechange = function() {
			if ( xhr.readyState === 4 ) {
				resp = JSON.parse( xhr.responseText );
				displayMap();
			}
		};
		xhr.send();
	}

	function parseLocation( data ) {
		latitude = data.coords.latitude.toString();
		longitude = data.coords.longitude.toString()
		$lat[0].innerHTML = latitude;
		$long[0].innerHTML = longitude;
		findUser();
	}

	function locate() {
		navigator.geolocation.getCurrentPosition( parseLocation );
	}

	locate();
});