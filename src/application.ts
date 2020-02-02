import {
  IncomingMessage,
  ServerResponse,
  createServer,
  Server,
  RequestListener
} from 'http';

export interface request {
  [key: string]: any
};

export interface response {
  [key: string]: any
}

export interface application {
  main: (req: IncomingMessage, res: ServerResponse, next: Function) => void;
  init: () => boolean;
  listen: (port: number, callback: () => void) => Server;
  handle: (req: IncomingMessage, res: ServerResponse, next: Function) => void;
  request?: request;
  response?: response;
};

/**
 * Callback to an  http server
 */
const proto: application = {
  main: function (req: IncomingMessage, res: ServerResponse, next: Function) {
    console.log('Main was called');
  },

  init: function (): boolean {
    return true;
  },

  listen: function (port: number, errorHandler: (err?: Error) => void) {
    const server: Server = createServer(this.main as RequestListener);
    // return server.listen.apply(server, [port, callback]);
    return server.listen.apply(server, [port, errorHandler]);
  },

  handle: function (req: IncomingMessage, res: ServerResponse, next: Function) {
    //Find Routes
    res.write('app.handle Not implemented');
    res.end();
  },
};

export default proto;