var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
  client.subscribe('set_output4', function (err) {
    if (!err) {
      console.log('subscribed to set_output4')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  if(topic=='set_output4')
  {
      console.log('set_output4 topic received')
      if(message=='0')
        LED.writeSync(0)
       else
        LED.writeSync(1)
  }
  //client.end()
})