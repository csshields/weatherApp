/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = "\n\t<h1>Weather App</h1>\n\t<div>This is a demo weather app that hits the openweathermap api</div>\n\t<hr>\n";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




/*
	This hits a weather API and shows the weather on the browser

	This uses a bunch of newer es6 stuff like template literals, let/const, modules, fetch, etc. 
	Also uses jquery just to do some basic stuff.

	Currently US Only. And it is limited to a certain number of calls per minute because
	its the free version.

	API
	http://openweathermap.org/current

*/

Object.defineProperty(exports, "__esModule", {
	value: true
});
var weatherApp = exports.weatherApp = {
	weatherKey: "573c01fdde52b7859e1a1d3a9dd2fd38",
	getWeather: function getWeather() {
		var _this = this;

		var location = $('#location').val();
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + ',us&APPID=' + this.weatherKey + '&units=imperial';
		var request = new Request(url, {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'text/plain'
			})
		});

		fetch(request).then(function (response) {
			return response.json();
		}).then(function (json) {
			_this.displayWeather(json);
			//this.updateMap( json.coord.lat, json.coord.lon );
		});
	},
	displayWeather: function displayWeather(data) {
		// debugger;
		var template = '\n\t\t\t<div>\n\t\t\t\t<h2>' + data.name + '</h2>\n\t\t\t\t<h3>' + data.main.temp.toFixed(0) + '\xB0F</h3>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\tDescription: <span>' + data.weather[0].description + '</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\tClouds: <span>' + data.clouds.all + '%</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\tHumidity: <span>' + data.main.humidity + '%</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\tPressure: <span>' + data.main.pressure + ' hpa</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\tWind: <span>' + data.wind.speed + ' m/s</span>\n\t\t\t</div>\n\t\t';
		$('.results').html(template);
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _header = __webpack_require__(0);

var _header2 = _interopRequireDefault(_header);

var _weather = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementsByTagName("header")[0].innerHTML = _header2.default;

$("#go").click(function (e) {
	_weather.weatherApp.getWeather();
});

$('#location').on('keypress', function (e) {
	if (e.which === 13) {
		_weather.weatherApp.getWeather();
	}
});

/***/ })
/******/ ]);