import DB from 'lib/db';
import Message from 'models/message';

const messageCollection = 'message';

/**
 * Service for postal objects.
 */
export default class PostalService {
  /**
   * Creates an instance of the database service.
   */
  constructor() {
    this.db = new DB();
  }

  /**
   * Retrieves a list of messages.
   * @public
   * @return {Promise.<Object[]>}
   */
  async getMessages() {
    await this.db.list(messageCollection);
    var testArr = [
            {
              "time": 255589200,
              "summary": "Snow (9–14 in.) and windy starting in the afternoon.",
              "icon": "snow",
              "sunriseTime": 255613996,
              "sunsetTime": 255650764,
              "moonPhase": 0.97,
              "precipIntensity": 0.0354,
              "precipIntensityMax": 0.1731,
              "precipIntensityMaxTime": 255657600,
              "precipProbability": 1,
              "precipAccumulation": 7.337,
              "precipType": "snow",
              "temperatureHigh": 31.84,
              "temperatureHighTime": 255632400,
              "temperatureLow": 28.63,
              "temperatureLowTime": 255697200,
              "apparentTemperatureHigh": 20.47,
              "apparentTemperatureHighTime": 255625200,
              "apparentTemperatureLow": 13.03,
              "apparentTemperatureLowTime": 255697200,
              "dewPoint": 24.72,
              "humidity": 0.86,
              "pressure": 1016.41,
              "windSpeed": 22.93,
              "windBearing": 56,
              "cloudCover": 0.95,
              "uvIndex": 1,
              "uvIndexTime": 255621600,
              "visibility": 4.83,
              "temperatureMin": 22.72,
              "temperatureMinTime": 255596400,
              "temperatureMax": 32.04,
              "temperatureMaxTime": 255672000,
              "apparentTemperatureMin": 11.13,
              "apparentTemperatureMinTime": 255650400,
              "apparentTemperatureMax": 20.47,
              "apparentTemperatureMaxTime": 255625200
            }
          ]

    return testArr;
  }

  /**
   * Returns a message by its ID.
   * @param {string} messageId
   * @return {Promise.<Object>}
   */
  async getMessage(messageId) {
    return await this.db.get(messageCollection, messageId);
  }

  /**
   * Creates a message.
   * @param {Object} message
   * @return {Promise.<Object>}
   */
  async createMessage(message) {
    let validatedMessage = await new Message(message).validate();
    return await this.db.put(messageCollection, validatedMessage);
  }

  /**
   * Updates a message.
   * @param {Object} message
   * @return {Promise.<Object>}
   */
  async updateMessage(message) {
    let validatedMessage = await new Message(message).validate();
    return await this.db.update(messageCollection, validatedMessage);
  }

  /**
   * Deletes a message.
   * @param {string} messageId
   * @return {Promise.<Object>}
   */
  async deleteMessage(messageId) {
    return await this.db.remove(messageCollection, messageId);
  }
}
