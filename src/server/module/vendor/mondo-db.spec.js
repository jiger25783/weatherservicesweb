import test from 'ava';
import MongoDB from './mongo-db';

test('should allow empty constructor', (t) => {
  t.notThrows(() => {
    new MongoDB();
  }, Error);
});
