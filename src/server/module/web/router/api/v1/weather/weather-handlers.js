import WeatherService from 'services/weather-service';

/**
 * Handlers for message routes.
 */
export default class WeatherHandlers {
  /**
   * Initializes required services.
   */
  constructor() {
    /**
     * @private
     * @type {WeatherService}
     */
    this.weatherService = new WeatherService();
  }

  /**
   * Handles requests for getting weather information.
   * @param {Object} request
   * @param {Object} reply
   */
  async getweatherinformation(request, reply) {
  	console.log("In here getweatherinformation:")
    var location = request.params.location
    if(location == "UNKNOWN"){
      location = request.ip
    }
    this.weatherService.getWeatherInformationFromDarkSky(location)
      .then(resp => {
        reply(resp)
      })
      .catch((e) => {
        console.log("Error:", e)
        reply(e);
      });
  }
}