
import winston from 'winston';

/******************************************************************************/

export default function (provider) { // eslint-disable-line no-unused-vars
  const logger = new (winston.Logger)();

  return {
    log: logger.log,
    debug: logger.debug,
    info: logger.info,
    warn: logger.warn,
    error: logger.error,
  };

  // return winston;
}
