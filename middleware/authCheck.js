const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const authChecker = async (req, res, next) => {
  if (!req.headers['x-auth-token']) {
    return res.status(419).json({
      code: 419,
      message: '유효하지 않은 토큰',
    });
  }
  const token = req.headers['x-auth-token'];
  try {
    const decodeObj = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.userid = decodeObj.userid;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 401,
        message: '토큰 만료',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰',
    });
  }
};

module.exports = authChecker;
