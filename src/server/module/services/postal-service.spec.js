import test from 'ava';
import PostalService from './postal-service';

test('should allow empty constructor', (t) => {
  t.notThrows(() => {
    new PostalService();
  }, Error);
});
