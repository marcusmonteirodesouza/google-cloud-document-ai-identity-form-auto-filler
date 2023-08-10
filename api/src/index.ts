import {app} from './app';
import {logger} from './logger';
import {config} from './config';

app.listen(config.port, () => {
  logger.info(
    {},
    `Identity Document Extractor service listening on port ${config.port}...`
  );
});
