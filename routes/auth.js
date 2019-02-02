const passport = require('passport');
const {Router} = require('express');
const router = Router();

const User = require('../models/User');

router
  .get('/signup', (req, res, next)=>{
    res.render('auth/signup');
  })
  .post('/signup', (req, res, next)=>{
    User.register( new User({ username: req.body.username , role: req.body.role }),
    req.body.password,
    function(err, account){
      if(err){
        return res.json(err);
      }
      return res.redirect('/login')
    });
  })
  .get('/login', (req, res, next)=>{
    return res.render('auth/login');
  })
  .post('/login', passport.authenticate('local'), (req, res, next)=>{
    let role = req.user.role;
    console.log(role)
    if(role === 'Empleado'){
      return res.redirect('/private2');
    } else {
      return res.redirect('/private');
    }
  })
  .get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/login');
  })
  .get('/private', (req, res, next)=>{
    const user = req.user;
    if(user){
      return res.render('empleador/private', {user: req.user});
    }
    return res.redirect("/login")
  })
  .get('/private2', (req, res, next)=>{
    const user = req.user;
    if(user){
      return res.render('empleado/private2', {user: req.user});
    }
    return res.redirect("/login")
  })
  .get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/login');
  })

module.exports = router;