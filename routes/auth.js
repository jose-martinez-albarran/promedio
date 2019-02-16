const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const User = require('../models/User.js');

passport.use(new GoogleStrategy({

  clientID: "780518897261-ktcvtita7t5ce99jmnlqj0gh8q8a8bu7.apps.googleusercontent.com",
  clientSecret: "w11M-09zbVszitX1JwHELtkn",
  callbackURL: "/auth/google/callback"

},
(token, refreshToken, profile, done) => {
    process.nextTick(() => {
        User.findOne({ 'google.id' : profile.id }, (err, user) => {
          if (err)
            return done(err);

          if (user) {
                return done(null, user);
          } else {
            var newUser = new User();

            newUser.google.id    = profile.id;
            newUser.google.token = token;
            newUser.google.name  = profile.displayName;
            newUser.google.email = profile.emails[0].value; // pull the first email

            newUser.save((err) => {
              if (err) throw err;
              return done(null, newUser);
            });
          }
      });
  });
}));

passport.use(User.createStrategy());

require('../routes/init.js')(User, passport);

module.exports = passport;
