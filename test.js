var siege = require('siege');

siege()
  .host('localhost')
  .on(3000)
  .concurrent(30)
  .for(10000).times
  .get('/')
  .post('/')
  .attack()

