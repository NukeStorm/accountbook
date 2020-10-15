/* eslint-disable prefer-arrow-callback */
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config({ path: '.env' });
const User = require('../models/user');

const jwtOptions = {
  // header에 bearer스키마에 담겨온 토큰 해석할 것
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // 해당 복호화 방법사용
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = () => {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userid',
        passwordField: 'pw',
      },
      function (userid, pw, done) {
        // 이 부분에선 저장되어 있는 User를 비교하면 된다.
        return User.findOne({ where: { userid, pw } })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: 'Incorrect id or password.' });
            }
            return done(null, user, { message: 'Logged In Successfully' });
          })
          .catch((err) => done(err));
      },
    ),
  );
};
