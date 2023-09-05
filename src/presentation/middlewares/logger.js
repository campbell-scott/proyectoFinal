import logger from '../../utils/pino.js'

export const requestLogger = (req, res, next) => {
  req.logger = logger
  logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`)
  next()
}