var GPIOS = require('./board/gpios.js')

var pins = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
var running = true
var ran = 1000
var gpios = new GPIOS(pins)
var recurTime = 5000

eng() 
function eng(){
    console.log(' - gpio - -  ', gpios.i)
    var n = (Math.random()<0.5)? 1 : -1    
    var p = gpios.nextTo(1).blink(5000)
    ran = Math.floor( Math.random() * 6000 )
    if(running){
	setTimeout(function(){eng()}, recurTime)
    }
}
