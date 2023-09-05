import logger from '../../utils/pino.js'

const errorHandler = (err, req, res, next) =>
{
  if (err?.message.includes('not found'))
  {
      logger.error(err.stack);
      return res.status(404).json({ message: err.message });
  }
  else if (err?.name.includes('ZodError'))
  {
      logger.error(err.stack);
      return res.status(400).json({ message: err.issues });
  }
  else if (err?.message.includes('invalid password.'))
  {
      logger.error(err.stack);
      return res.status(401).send({ message: 'Login failed, invalid password.'});
  }
  else if (err?.message.includes('Email and Password invalid format'))
  {
      logger.error(err.stack);
      return res.status(401).send({ message: 'Email and Password invalid format.'});
  }
  else if (err?.message.includes('dont exist'))
  {
      logger.error(err.stack);
      return res.status(404).send({ message: "User don't exist."});
  }
  else if (err?.message.includes('The product code is already in use'))
  {
      logger.error(err.stack);
      return res.status(404).send({ message: err.message});
  }
  else if (err?.message.includes('is already in use'))
  {
      logger.error(err.stack);
      return res.status(404).send({ message: err.message});
  }
  else if (err?.message.includes('You must provide a password'))
  {
      logger.error(err.stack);
      return res.status(404).send({ message: err.message});
  }
  else if (err?.message.includes('at path "_id"'))
  {
      logger.error(err.stack);
      return res.status(404).send({ message: 'Id not found.' });
  }
  else if (err?.message.includes('Invalid permissions'))
  {
      logger.error(err.stack);
      return res.status(400).send({ message: err.message });
  }
  else if (err?.message.includes('We only have'))
  {
      logger.error(err.stack);
      return res.status(422).send({ message: err.message });
  }
  else if (err?.message.includes('out of stock.'))
  {
      logger.error(err.stack);
      return res.status(422).send({ message: err.message });
  }

	logger.error(err.stack);
	res.status(500).json({ message: 'An error has occurred.' });
};

export default errorHandler;