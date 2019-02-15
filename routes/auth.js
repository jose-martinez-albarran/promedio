const passport = require("passport");
const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Picture = require("../models/picture");

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
    }
    return res.redirect("/login");
  })
  .post("/profile", (req,res,next) =>{
    const user = req.user;
    console.log(user);
    if(user){
      let userName = req.user._id;
      console.log(userName);
      const {nombre, apellidoPaterno, apellidoMaterno, celular, correo} = req.body
      User.updateOne({ _id :  userName}, {$set: {nombre, apellidoPaterno, apellidoMaterno, celular, correo}})
      .then(libro =>{
        res.redirect('/profile')
      })
      .catch(err=>console.log(err))
    }
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
    req.logout();
    res.redirect("/login");
  })


module.exports = router;
