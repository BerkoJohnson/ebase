const securePin = require('secure-pin');
for (var i = 0; i < 10; i++) {
  securePin.generatePin(4, (pin) => { console.log(pin)})
}
