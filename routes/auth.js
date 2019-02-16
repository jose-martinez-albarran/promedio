const passport = require('passport');
const {Router} = require('express');
const router = Router();

const User = require('../models/User');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

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
      return res.render('auth/empleador/private', {user: req.user});
    }
    return res.redirect("/login")
  })
  .get('/private2', (req, res, next)=>{
    const user = req.user;
    if(user){
      return res.render('auth/empleado/private2', {user: req.user});
    }
    return res.redirect("/login")
  })

  .get('/profileE', (req, res, next) =>{
    const user = req.user;
    if(user){
      return res.render('auth/empleador/profileE', {user: req.user});
    }
    return res.redirect("/login")
  })


  .get('/profile', (req, res, next)=>{
    const user = req.user;
    if(user){
      return res.render('auth/empleado/profile', {user: req.user});
    }
    return res.redirect("/login")
  })

   .get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/login');
  })

  .post("/profileE", (req,res) => {
      const { ingreso , empresa, puesto, beneficiarios, username, role} = req.body;
      User.updateOne(
        { _id: req.query.user_id },
        { $set: { ingreso , empresa, puesto, beneficiarios, username, role} }
      )
      .then(user => {
        res.redirect("/profileE");
      })
      .catch(err => console.log(err));
    });


  router.post("/profile", (req,res) => {
    const { ingreso , beneficiarios, username, role} = req.body;
    User.updateOne(
      { _id: req.query.user_id },
      { $set: { ingreso , beneficiarios, username, role} }
    )
    .then(user => {
      res.redirect("/profile");
    })
    .catch(err => console.log(err));
  });

  
 router .get("/libros/:id", (req, res) => {
    let libroId = req.params.id;
    console.log(libroId);
    Books.findOne({ _id: libroId })
      .populate("author")
      .then(libro => {
        res.render("book-detalle", { libro });
      })
      .catch(err => {
        console.log(err);
      });
  });


  router.post('/upload', upload.single('photo'), (req, res)=>{
    const {path} = req.body
    User.updateOne({_id:req.query.user_id}, {$set: {path}})
    .then(libro =>{
      res.redirect('/private2')
    })
    .catch(err=>console.log(err))
  })

  router.get("/auth/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"]
  }));
  
  router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/not-found",
    successRedirect: "/private"
  }));
  
  

module.exports = router;



