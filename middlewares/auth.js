const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error/401-unathorized');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  // }

  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError(`Необходима авторизация`));
  }
  req.user = payload;
  return next();

};
