const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error/401-unathorized');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new UnauthorizedError(`Необходима авторизация ${authorization}`));
  // }
  const token = authorization.replace('Bearer ', '');

  if (authorization) {
    let payload;
    try {
      payload = jwt.verify(
        token,
        process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
    } catch (err) {
      return next(new UnauthorizedError(`Необходима авторизация ${authorization}`));
    }
    req.user = payload;
    return next();
  } else {
    return next(new UnauthorizedError(`Необходима авторизация ${authorization}`));
  }
  // let payload;
  // try {
  //   payload = jwt.verify(
  //     token,
  //     process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  //   );
  // } catch (err) {
  //   return next(new UnauthorizedError(`Необходима авторизация ${authorization}`));
  // }
  // req.user = payload;
  // return next();
};




// // получаем переменные из .env среды
// const { NODE_ENV, JWT_SECRET } = process.env;

// // модуль для создания и подтверждения токенов
// const jwt = require('jsonwebtoken');

// // подключаем 401 ошибку авторизации
// const { UnathorizedError } = require('../utils/error');

// module.exports.validateToken = (req, res, next) => {
//   // получаем токен из запроса
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     // проверяем токен
//     payload = jwt.verify(
//       token,
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//     );
//   } catch (err) {
//     return next(new UnathorizedError('Authorization required'));
//   }
//   req.user = payload;
//   return next();
// };
