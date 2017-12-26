import Config from 'config/config';
import Boom from 'boom';
import Bcrypt from 'bcryptjs';
import Joi from 'joi';
import Path from 'path';
import JWT from 'jsonwebtoken';
import Promise from 'bluebird';

const ONE_HOUR_IN_MILLIS = 3600;
const ADMIN_APP_DIR = Path.join(__dirname, '../../app');

/**
 * App view routes.
 */
export default class AppRoutes {
  /**
   * Creates route for each admin endpoint.
   */
  constructor() {
    /**
     * @private
     * @type {Config}
     */
    this.config = new Config().getConfig();
    /**
     * Array of routes for endpoints.
     * @private
     * @type {Object[]}
     */
    this.routes = [
      // Route for logging-in the client. Accepts a username and
      // password, and returns a JWT in the body of the response
      // if authenticated.
      {
        method: 'POST',
        path: '/api/login',
        config: {
          validate: {
            payload: {
              email: Joi.string()
                .email()
                .required(),
              password: Joi.string()
                .min(2)
                .max(200)
                .required(),
            },
          },
        },
        handler: (request, reply) => {
          let user = request.payload;
          this.validateCredentials(user)
            .then(() => {
              reply(this.getToken(user.email));
            })
            .catch(() => {
              reply(Boom.unauthorized('Incorrect e-mail or password.'));
            });
        },
      },
      // Returns the main JS application in one JS file.
      {
        method: 'GET',
        path: '/main.bundle.js',
        config: {},
        handler: (request, reply) => {
          reply.file(Path.join(ADMIN_APP_DIR, 'main.bundle.js'), {
            confine: false,
          });
        },
      },
      // Returns all non-matches (which would normally be 404s) and returns
      // the index.html file instead. This is required for HTML5 routing for
      // SPAs to not require a hash (#) in the URL.
      {
        method: 'GET',
        path: '/{path*}',
        config: {},
        handler: (request, reply) => {
          reply.file(Path.join(ADMIN_APP_DIR, 'index.html'), {
            confine: false,
          });
        },
      },
    ];
  }

  /**
   * Returns routes.
   * @public
   * @return {Object[]}
   */
  getRoutes() {
    return this.routes;
  }

  /**
   * Creates and returns a valid token.
   * @private
   * @param {string} email
   * @return {Object}
   */
  getToken(email) {
    const NOW_IN_MILLIS = Math.floor(Date.now() / 1000);
    const token = {
      data: {
        email,
        isAdmin: true,
      },
      exp: NOW_IN_MILLIS + ONE_HOUR_IN_MILLIS,
    };
    return JWT.sign(token, this.config.jwtPrivateKey);
  }

  /**
   * Validates the admin credentials against the one in the configuration.
   * @private
   * @param {Object} user
   * @return {Promise.<void>}
   */
  validateCredentials(user) {
    return new Promise((resolve, reject) => {
      if (user.email !== this.config.adminUsername) {
        reject();
      }
      Bcrypt.compare(
        user.password, this.config.adminPassword, (err, isValid) => {
        if (err) {
          reject(err);
        } else if (isValid) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}
