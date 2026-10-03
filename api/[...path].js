import { app, initializeServer } from '../backend/server.js';

export default async function handler(request, response) {
  await initializeServer();
  return app(request, response);
}
