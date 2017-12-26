import Config from 'config/config';
import Promise from 'bluebird';
let request = require('request');


/**
 * Service for postal objects.
 */
export default class WeatherService {
  /**
   * Creates an instance of the database service.
   */
  constructor() {
    this.config = new Config().getConfig();
  }

  /**
   * get weather information
   * @private
   * @param {string} locationParam
   * @return {Promise.<void>}
   */
  getWeatherInformationFromDarkSky(locationParam) {
    console.log("inside getWeatherInformationFromDarkSky")
    return new Promise((resolve, reject) => {
      let url = 'https://'+ this.config.apiServerUid +':' + this.config.apiServerPwd 
                + '@' + this.config.apiServerHost
                + '/weatherapi/v1/getLastWeekWeatherInfo/' + locationParam
      console.log("URL1:" + url)
      request({
                "url":url,
                "strictSSL": false, //because certificate is self signed
              }, (error, response, resBody) => {
        if (error || !response || response.statusCode !== 200 ) reject();

        if (response.statusCode == 200) {
          var body = JSON.parse(resBody);
          resolve(resBody);
        } else {
          console.log("Some error:" + error + " response:" , response.statusCode)
          reject()
        }

      });
    });
  }
}
