/**
 * Logging configuration holder.
 */
export default class LoggingConfig {
  /**
   * Creates a configuration object.
   */
  constructor() {
    /**
     * Configuration object.
     * @private
     * @type {Object}
     */
    this.config = {
      logging: {
        register: require('good'),
        options: {
          ops: {
            interval: 5000, // milliseconds
          },
          reporters: {
            consoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{error: '*', log: '*', response: '*'}],
              }, {
                module: 'good-console',
              }, 'stdout',
            ],
          },
        },
      },
    };
  }

  /**
   * Returns the logging configuration holder object.
   * @public
   * @return {Object}
   */
  getConfig() {
    return this.config;
  }
}
