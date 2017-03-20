'use strict'
const weatherKey = "573c01fdde52b7859e1a1d3a9dd2fd38";


/*
	This hits a weather API and shows the weather on the browser

	This uses a bunch of newer es6 stuff like template literals, let/const, fetch, etc. 
	Also uses jquery just to do some basic stuff. Works in Chrome only at the moment.
	I could transpile it with Babel if I wanted to make it browser friendly.

	Currently US Only. And it is limited to a certain number of calls per minute because
	its the free version.

	API
	http://openweathermap.org/current

*/

let weatherApp = {
	getWeather : function(){
		let location = $('#location').val();
		let url = `http://api.openweathermap.org/data/2.5/weather?q=${location},us&APPID=${weatherKey}&units=imperial`;
		let request = new Request( url , {
			method: 'GET', 
			mode: 'cors', 
			headers: new Headers({
				'Content-Type': 'text/plain'
			})
		});

		fetch(request).then( (response) => { 
			return response.json();
		}).then( (json) => {
			this.displayWeather(json);
			this.updateMap( json.coord.lat, json.coord.lon );
		});
	},
	displayWeather : function( data ){
		// debugger;
		let template = `
			<div>
				<h2>${data.name}</h2>
				<h3>${data.main.temp.toFixed(0)}°F</h3>
			</div>
			<div>
				Description: <span>${data.weather[0].description}</span>
			</div>
			<div>
				Clouds: <span>${data.clouds.all}%</span>
			</div>
			<div>
				Humidity: <span>${data.main.humidity}%</span>
			</div>
			<div>
				Pressure: <span>${data.main.pressure} hpa</span>
			</div>
			<div>
				Wind: <span>${data.wind.speed} m/s</span>
			</div>
		`;
		$('.results').html(template);
	},
	updateMap : function(lat,long){
		let osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		let osmAttribution = 'Map data © OpenStreetMap contributors, CC-BY-SA';
		let osmLayer = new L.TileLayer(osmUrl, {maxZoom: 13, attribution: osmAttribution});
		let map = new L.Map('mapid');
		map.setView([lat, long], 13);
		map.addLayer(osmLayer);

		L.tileLayer('http://{s}.tile.openweathermap.org/map/temperature/{z}/{x}/{y}.png', {
		    attribution: 'Map data © OpenWeatherMap',
		    maxZoom: 13
		}).addTo(map);

	},
	initMap : function(){
		this.updateMap( 42.53,-71.76 ); //defaults to leominster
	}

}


$("#go").click( (e) => {
	weatherApp.getWeather();
});

$('#location').on('keypress', (e) => {
	if(e.which === 13){
		weatherApp.getWeather();
	}
});


//weatherApp.initMap();

