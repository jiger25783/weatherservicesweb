import test from 'ava';
import WeatherRoutes from './weather-routes';

test('should allow empty constructor', (t) => {
  t.notThrows(() => {
    new WeatherRoutes();
  }, Error);
});

test('should return an array of routes', (t) => {
  let routes = new WeatherRoutes().getRoutes();
  t.true(Array.isArray(routes));
});

test('should have valid route configurations', (t) => {
  let routes = new WeatherRoutes().getRoutes();
  routes.forEach((r) => {
    t.true(typeof r.method === 'string');
    t.true(typeof r.path === 'string');
    t.true(typeof r.config === 'object');
    t.true(typeof r.config.auth === 'string');
    t.true(typeof r.config.handler === 'function');
  });
});
