require('dotenv').config();

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const multer       = require('multer');
const user         = require('./models/User');

const passport = require('./services/passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)




mongoose
  .connect('mongodb://promedio:promedio123@ds113855.mlab.com:13855/promedio', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'plugin',
  resave: false,
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
              storage: storage
          }).single('file');
/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
       res.json({error_code:0,err_desc:null});
  });
});


passport.use(new GoogleStrategy({
  clientID: "780518897261-ktcvtita7t5ce99jmnlqj0gh8q8a8bu7.apps.googleusercontent.com",
  clientSecret: "w11M-09zbVszitX1JwHELtkn",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  user.findOne({ googleID: profile.id })
  .then(user => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    next(error)
  })

}));

<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> parent of 28dc600... cambios en buscar
=======
>>>>>>> parent of 28dc600... cambios en buscar
app.use(passport.initialize())
app.use(passport.session())


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + '/views/auth/partials');


// default value for title local
app.locals.title = 'Promedio';



const index = require('./routes/index');
app.use('/', index);

const authRoutes = require("./routes/auth");
app.use('/', authRoutes);


module.exports = app;
