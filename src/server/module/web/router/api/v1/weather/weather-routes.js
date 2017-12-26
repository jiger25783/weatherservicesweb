import WeatherHandler from './weather-handlers';

/**
 * Creates and returns routes for weather.
 */
export default class WeatherRoutes {
  /**
   * Creates route for each weather endpoint.
   */
  constructor() {
    /**
     * @private
     * @type {WeatherHandler}
     */
    this.weatherHandler = new WeatherHandler();

    /**
     * Array of routes for weather endpoints.
     * @private
     * @type {Object[]}
     */
    this.routes = [
      {
        method: 'GET',
        path: '/api/v1/getweatherinformation/{location}',
        config: {
          auth: 'token',
          handler: (request, reply) =>
            this.weatherHandler.getweatherinformation(request, reply),
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
}
