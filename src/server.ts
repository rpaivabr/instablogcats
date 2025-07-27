import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { getContext } from '@netlify/angular-runtime/context.mjs';
// import { readFileSync } from 'node:fs';


const browserDistFolder = join(import.meta.dirname, '../browser');

// const app = express();
// const angularApp = new AngularNodeAppEngine();

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEnginehandler(request: Request): Promise<Response> {
  const context = getContext();

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not Found', { status: 404 });
}

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

// app.get('/api/posts', (_req, res) => {
//   const jsonFile = readFileSync(join(import.meta.dirname, '../browser/images/posts.json'), 'utf-8');
//   const posts = JSON.parse(jsonFile);
//   // console.log('First post', posts[0]);
//   res.json(posts);
// });

/**
 * Serve static files from /browser
 */
// app.use(
//   express.static(browserDistFolder, {
//     maxAge: '1y',
//     index: false,
//     redirect: false,
//   }),
// );

/**
 * Handle all other requests by rendering the Angular application.
 */
// app.use((req, res, next) => {
//   angularApp
//     .handle(req)
//     .then((response) =>
//       response ? writeResponseToNodeResponse(response, res) : next(),
//     )
//     .catch(next);
// });

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, (error) => {
//     if (error) {
//       throw error;
//     }

//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
// export const reqHandler = createNodeRequestHandler(app);

export const requestHandler = createRequestHandler(netlifyAppEnginehandler);
