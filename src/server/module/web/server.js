import Config from '../config/config';
import Hapi from 'hapi';
import Inert from 'inert';
import AppRoutes from './router/app/app-routes';
import WeatherRoutes from './router/api/v1/weather/weather-routes';
import AuthService from '../services/auth-service';

/**
 * Server object.
 */
export default class Server {
  /**
   * Creates an instance of the API Server.
   */
  constructor() {}

  /**
   * Starts listening for connections.
   * @public
   */
  startServer() {
    const config = new Config().getConfig();

    const server = new Hapi.Server({});

    // Register logging client.
    server.register(config.logging, (err) => {
      if (err) {
        throw err;
      }

      // Configure the server connection.
      server.connection({
        host: config.server.host,
        port: config.server.port,
      });

      new AuthService(server)
        .configure()
        .then(() => {
          // Register the server plugin for files.
          server.register([Inert], (err) => {
            if (err) {
              throw err;
            }

            // Add routes to the server.
            server.route(new AppRoutes().getRoutes());
            server.route(new WeatherRoutes().getRoutes());

            // Start the server.
            server.start((err) => {
              if (err) {
                throw err;
              }
              server.log(['info'], 'Server was started successfully.');
            });
          });
        });
    });
  }
}
