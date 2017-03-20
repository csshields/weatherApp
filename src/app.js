import header from './header';
import { weatherApp } from './weather';

document.getElementsByTagName("header")[0].innerHTML = header;

$("#go").click( (e) => {
	weatherApp.getWeather();
});

$('#location').on('keypress', (e) => {
	if(e.which === 13){
		weatherApp.getWeather();
	}
});

