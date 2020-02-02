import {
  IncomingMessage,
  ServerResponse
} from 'http';

import proto, { application } from './application';

function createApp() {

  const app: application = Object.create(proto);

  /**
   * Late create a version of th emain to handle request
   */
  app.main = function (req: IncomingMessage, res: ServerResponse, next: Function) {
    console.log('New main was called');
    app.handle(req, res, next);
  };

  app.request = Object.create({ uri: 'http://127.0.0.1' });
  app.response = Object.create({ type: 'json' });

  return app;
};

module.exports = createApp