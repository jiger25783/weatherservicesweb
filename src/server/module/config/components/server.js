import Joi from 'joi';

// Password: 'admin'
const DEFAULT_ADMIN_PASSWORD_HASH =
  '$2a$04$fM5P8toFTNM2kb8usHm.0uUJgZMMxGy.WPmEf6H2KyU8M73RHo9Dy';

const DEFAULT_JWT_KEY =
  '3gkRj_p3s1eo9dKGI3KXajCEHtZ-1Naw4wUprjdbso-SoK6bMKmsDzA4h6gY_Hjv';

/**
 * Schema object for server configuration settings.
 */
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production'])
    .default('development'),
  HOST: Joi.string()
    .allow(['127.0.0.1', '0.0.0.0'])
    .default('0.0.0.0'),
  PORT: Joi.number()
    .default('8080'),
  JWT_PRIVATE_KEY: Joi.string()
    .default(DEFAULT_JWT_KEY),
  ADMIN_USERNAME: Joi.string()
    .default('admin@arcusnext.com'),
  ADMIN_PASSWORD: Joi.string()
    .default(DEFAULT_ADMIN_PASSWORD_HASH),
}).unknown().required();

const api_server_host = process.env.API_SERVER_HOST || "35.227.124.97"

/**
 * Server configuration holder.
 */
export default class ServerConfig {
  /**
   * Creates a configuration object from the system environmental variables.
   */
  constructor() {
    const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    /**
     * Configuration object.
     * @private
     * @type {Object}
     */
    this.config = {
      env: envVars.NODE_ENV,
      isDevelopment: envVars.NODE_ENV === 'development',
      jwtPrivateKey: envVars.JWT_PRIVATE_KEY,
      adminUsername: envVars.ADMIN_USERNAME,
      adminPassword: envVars.ADMIN_PASSWORD,
      server: {
        host: envVars.HOST,
        port: envVars.PORT,
      },
      //following can be environemnt veriable as well but hardcoding for now
      apiServerHost: api_server_host,
      apiServerPort: "8087",
      apiServerUid: "jigar",
      apiServerPwd: "patel"
    };
  }

  /**
   * Returns the server configuration holder object.
   * @public
   * @return {Object}
   */
  getConfig() {
    return this.config;
  }
}
