const passport = require("passport");
const { Router } = require("express");
const router = Router();

<<<<<<< HEAD
const User = require('../models/User');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
=======
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Picture = require("../models/picture");
>>>>>>> uploadPhoto

router
  .get("/signup", (req, res, next) => {
    res.render("auth/signup");
  })
  .post("/signup", (req, res, next) => {
    User.register(
      new User({ username: req.body.username, role: req.body.role }),
      req.body.password,
      function(err, account) {
        if (err) {
          return res.json(err);
        }
        return res.redirect("/login");
      }
    );
  })
  .get("/login", (req, res, next) => {
    return res.render("auth/login");
  })
  .post("/login", passport.authenticate("local"), (req, res, next) => {
    let role = req.user.role;
    console.log(role);
    if (role === "Empleado") {
      return res.redirect("/private2");
    } else {
      return res.redirect("/private");
    }
  })
  .get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/login");
  })
  .get("/private", (req, res, next) => {
    const user = req.user;
<<<<<<< HEAD
    if(user){
      return res.render('auth/empleador/private', {user: req.user});
=======
    if (user) {
      return res.render("auth/empleador/private", { user: req.user });
    }
    return res.redirect("/login");
  })
  .get("/private2", (req, res, next) => {
    const user = req.user;
    if (user) {
      return res.render("auth/empleado/private2", { user: req.user });
    }
    return res.redirect("/login");
  })
  .get("/profile", (req, res, next) => {
    const user = req.user;
    if (user) {
      return res.render("auth/empleado/profile", { user: req.user });
>>>>>>> uploadPhoto
    }
    return res.redirect("/login");
  })
  .post("/profile", (req,res,next) =>{
    const user = req.user;
    console.log(user);
    if(user){
<<<<<<< HEAD
      return res.render('auth/empleado/private2', {user: req.user});
=======
      let userName = req.user._id;
      console.log(userName);
      const {nombre, apellidoPaterno, apellidoMaterno, celular, correo} = req.body
      User.updateOne({ _id :  userName}, {$set: {nombre, apellidoPaterno, apellidoMaterno, celular, correo}})
      .then(libro =>{
        res.redirect('/profile')
      })
      .catch(err=>console.log(err))
>>>>>>> uploadPhoto
    }
})
.get("/banorte", (req, res, next) => {
  const user = req.user;
  if (user) {
    return res.render("banks/banorte", { user: req.user });
  }
  return res.redirect("/login");
})
  .get("/photo", (req, res, next) => {
    const user = req.user;
    console.log(user);
    if (user) {
      let photoName = req.user.username
      Picture.findOne({ name :  photoName})
        .then(pictures => {
          res.render("auth/empleado/photo", { pictures });
        })
        .catch(err => {
          console.log(err);
        });} 
  })
<<<<<<< HEAD
  .get('/profile', (req, res, next)=>{
    const user = req.user;
    if(user){
      return res.render('auth/empleado/profile', {user: req.user});
    }
    return res.redirect("/login")
  })
   .get('/logout', (req, res, next)=>{
=======
  .post('/photo', upload.single('photo'), (req, res) => {
    const user = req.user._id;
    console.log(user);
    const pic = new Picture({
      name: user,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });
    pic.save((err) => {
        res.redirect('/private2');
    });
  })
  .get("/logout", (req, res, next) => {
>>>>>>> uploadPhoto
    req.logout();
    res.redirect("/login");
  })


<<<<<<< HEAD
  .post("/profile", (req,res) => {
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
  

module.exports = router;
=======
module.exports = router;
>>>>>>> uploadPhoto
