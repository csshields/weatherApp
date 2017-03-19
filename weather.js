'use strict'
const weatherKey = "573c01fdde52b7859e1a1d3a9dd2fd38";

$("#go").click( (e) => {
	getWeather();
});

$('#location').on('keypress', (e) => {
	if(e.which === 13){
		getWeather();
	}
});

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


function getWeather( location ){
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
		displayWeather(json);
	});
}

function displayWeather( data ){
	let template = `
		<div>
			<h3>${data.main.temp.toFixed(0)}°F</h3>
		</div>
		<div>
			Clouds: <span>${data.clouds.all}%</span>
		</div>
		<div>
			humidity: <span>${data.main.humidity}%</span>
		</div>
		<div>
			Pressure: <span>${data.main.pressure} hpa</span>
		</div>
		<div>
			Wind: <span>${data.wind.speed} m/s</span>
		</div>
	`;
	$('.results').html(template);
}

