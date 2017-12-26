import ServerConfig from './components/server';
import LoggingConfig from './components/logging';

/**
 * Creates one configuration object based on the all of the other
 * configuration objects.
 */
export default class Config {
  /**
   * Creates a configuration object by merging all of the configuration objects.
   */
  constructor() {
    let serverConfig = new ServerConfig().getConfig();
    let loggingConfig = new LoggingConfig().getConfig();
   
    /**
     * Configuration object.
     * @private
     * @type {Object}
     */
    this.config = Object.assign({}, serverConfig, loggingConfig);
  }

  /**
   * Returns the configuration object.
   * @public
   * @return {Object}
   */
  getConfig() {
    return this.config;
  }
}
