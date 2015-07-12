/* pepple_edison : Jose Collas : 6.2015 */
var Cylon = require('cylon');
var querystring = require('querystring');
var request = require('request');
var sd = require('./setDisplay');
var pfb = require('./pollFireBase');
//var sendD = require('./sendData');
var pstM2X = require('./postM2X');

Cylon.robot(
{
	connections:{
		edison:{adaptor: 'intel-iot'}
	},
	devices: {
		led: {driver:'led', pin:4},
		screen: {driver: 'upm-jhd1313m1'},
		button: {driver: 'button', pin:2},
		rotary: { driver: 'analogSensor', pin: 1, connection: 'edison', lowerLimit: 1, upperLimit: 179 },
		temperature: {driver: 'analogSensor', pin: 0},
		light: {driver: 'analogSensor', pin:3},
		sound: {driver: 'analogSensor', pin:2}
	},
	work: function(my){
		var out = {};
		// Control
		my.screen.setColor(255,150,0);
		my.sound.on('analogRead', function(d){
			out.sound = d;
		});
		my.light.on('analogRead', function(d){
			out.light = d;
		});
		my.temperature.on('analogRead', function(d){
			out.temperature = d;
		});
		my.rotary.on('analogRead', function(data){			
			//my.screen.setColor(Math.round(data/5), 0, Math.round(data/5));
		});
		my.button.on('push', function(){
			my.led.toggle();
		});
		// Timer
		every((1).second(), function(){
			sd.setDisplay(my);
		});
		every((2).second(), function(){
			pfb.pollFireBase(my);
		}); // possibly update display
		every((2).second(), function(){		
			pstM2X.postM2X(out);
		});
	}	
}).start();


