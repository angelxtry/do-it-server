const passport = require('passport');
const { User } = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // console.log('SERIALIZE: ', user.id);
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'nickname', 'email'],
      });
      // console.log('DESERIALIZE: ', user);
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
};
