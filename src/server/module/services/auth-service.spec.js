import AuthService from './auth-service';
import Hapi from 'hapi';
import sinon from 'sinon';
import test from 'ava';

test('should not allow empty constructor', (t) => {
  t.throws(() => {
    new AuthService();
  }, Error);
});

test('config should not be null after initializing', (t) => {
  let server = new Hapi.Server();
  let authService = new AuthService(server);
  t.truthy(authService.config);
});

test('server should not be null after initializing', (t) => {
  let server = new Hapi.Server();
  let authService = new AuthService(server);
  t.truthy(authService.server);
});

test('validate should always call callback', (t) => {
  let server = new Hapi.Server();
  let authService = new AuthService(server);
  let callback = sinon.spy();
  authService.validate(null, null, callback);
  t.true(callback.called);
});

test('validate should not allow empty username', (t) => {
  let server = new Hapi.Server();
  let authService = new AuthService(server);
  let callback = sinon.spy();
  authService.validate(null, null, callback);
  t.true(callback.calledWith(null, false));
});
