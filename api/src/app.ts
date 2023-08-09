import express from 'express';
import crypto from 'crypto';
import pinoHttp from 'pino-http';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import {logger} from './logger';
import {HealthCheckRouter} from './health-check';
import {errorHandler} from './error-handler/v1';
import {
  DocumentsRouter as DocumentsRouterV1,
  USDocumentsService as USDocumentsServiceV1,
} from './documents/v1';
import {DocumentProcessorServiceClient} from '@google-cloud/documentai';
import {config} from './config';

const documentProcessorServiceClient = new DocumentProcessorServiceClient({
  projectId: config.google.projectId,
});

const healthCheckRouter = new HealthCheckRouter().router;

const usDocumentsServiceV1 = new USDocumentsServiceV1({
  documentAi: {
    documentProcessorServiceClient,
    processors: {
      usDriverLicense: {
        location: config.documentAi.processors.usDriverLicense.location,
        id: config.documentAi.processors.usDriverLicense.id,
      },
    },
  },
});

const documentsRouterV1 = new DocumentsRouterV1({
  usDocumentsService: usDocumentsServiceV1,
}).router;

const app = express();

app.use(
  pinoHttp({
    logger,

    genReqId: function (req, res) {
      const existingId = req.id ?? req.headers['x-cloud-trace-context'];

      if (existingId) {
        return existingId;
      }

      // See https://cloud.google.com/trace/docs/setup#force-trace
      const traceId = crypto.randomBytes(16).toString('hex');
      const spanId = crypto.randomInt(1, 281474976710655);
      const id = `${traceId}/${spanId};o=1`;
      res.setHeader('x-cloud-trace-context', id);
      return id;
    },

    serializers: {
      req(req) {
        req.body = req.raw.body;
        return req;
      },
    },
  })
);

app.use(cors());

app.use(express.json());

app.use(fileUpload());

app.use('/', healthCheckRouter);

app.use('/v1/documents', documentsRouterV1);

app.use(
  async (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    await errorHandler.handleError(err, req, res);
  }
);

export {app};
