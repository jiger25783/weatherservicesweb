import Config from 'config/config';
import * as HapiAuthJWT from 'hapi-auth-jwt';
import Promise from 'bluebird';

/**
 * Creates and returns the API authentication scheme.
 */
export default class AuthService {
  /**
   * Creates authentication scheme.
   * @param {Object} server
   */
  constructor(server) {
    if (!server) throw new Error('Server object is required.');
    /**
     * @private
     * @type {Object}
     */
    this.config = new Config().getConfig();
    /**
     * @private
     * @type {Object}
     */
    this.server = server;
  }

  /**
   * Configures the authentication scheme.
   * @return {Promise.<Object>}
   */
  configure() {
    return new Promise((resolve, reject) => {
      this.server.register(HapiAuthJWT, (err) => {
        if (err) {
          reject(err);
        } else {
          this.server.auth.strategy('token', 'jwt', {
            key: this.config.jwtPrivateKey,
            validateFunc: this.validate.bind(this),
            verifyOptions: {algorithms: ['HS256']},
          });
          resolve();
        }
      });
    });
  }

  /**
   * Validates request.
   * @param {Object} request
   * @param {Object} decodedToken
   * @param {Function} callback
   */
  validate(request, decodedToken, callback) {
    if (decodedToken) {
      callback(null, true, {});
    } else {
      callback(null, false);
    }
  }
}
