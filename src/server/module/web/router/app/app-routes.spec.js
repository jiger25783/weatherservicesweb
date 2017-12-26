import test from 'ava';
import AppRoutes from './app-routes';

test('should allow empty constructor', (t) => {
  t.notThrows(() => {
    new AppRoutes();
  }, Error);
});

test('should return an array of routes', (t) => {
  let routes = new AppRoutes().getRoutes();
  t.true(Array.isArray(routes));
});

test('should have valid route configurations', (t) => {
  let routes = new AppRoutes().getRoutes();
  routes.forEach((r) => {
    t.true(typeof r.method === 'string');
    t.true(typeof r.path === 'string');
    t.true(typeof r.config === 'object');
  });
});
