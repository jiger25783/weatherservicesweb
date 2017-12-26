import Config from 'config/config';
import Mongo from 'mongodb';
import Promise from 'bluebird';

/**
 * Pre-configures and returns a Mongo connection object.
 */
export default class MongoDB {
  /**
   * Configures the Mongo connection object.
   */
  constructor() {
    /**
     * @private
     * @type {Config}
     */
    const config = new Config().getConfig();
    /**
     * Holder for Mongo client object.
     * @private
     * @type {AWS}
     */
    this.mongoClient = Mongo.MongoClient;
    /**
     * Connection URL for the database.
     * @type {string}
     */
    this.connectionUrl = `mongodb://${config.dbServer.host}:${config.dbServer.port}/sample`;
  }

  /**
   * Returns MongoBD connection object.
   * @public
   * @return {Object}
   */
  getDatabase() {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(this.connectionUrl, (err, db) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });
  }
}
