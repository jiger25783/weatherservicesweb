import test from 'ava';
import WeatherHandlers from './weather-handlers';

test('should allow empty constructor', (t) => {
  t.notThrows(() => {
    new WeatherHandlers();
  }, Error);
});
