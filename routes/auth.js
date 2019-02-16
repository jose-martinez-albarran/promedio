const passport = require("passport");
const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Picture = require("../models/picture");
const Promociones = require("../models/promociones");
const nodeMailer = require('nodemailer');
const iframeReplacement = require('node-iframe-replacement');

router.use(iframeReplacement);

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

   .get('/login', (req, res, next)=>{
    return res.render('auth/login');
  })
  .post("/login", passport.authenticate("local"), (req, res, next) => {
    let role = req.user.role;
    console.log(role);
    if (role === "Empleado") {
      return res.redirect("/empleado");
    } else {
      return res.redirect("/private");
    }
  })
  .get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/login");
  })

  .get('/private', (req, res, next)=>{
    const user = req.user;
    if (user) {
      return res.render("auth/empleador/private", { user: req.user });
    }
    return res.redirect("/login");
  })
  .get("/empleado", (req, res, next) => {
    const user = req.user;
    if (user) {
      return res.render("auth/empleado/private2", { user: req.user });
    }
    return res.redirect("/login");
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
.get("/message", (req, res, next) => {
  const user = req.user;
  if (user) {
    return res.render("apps/message", { user: req.user });
  }
  return res.redirect("/login");
})
.get("/promo", (req, res, next) => {
  const user = req.user;
  console.log(user);
  if (user) {
    Promociones.find()
      .then(promociones => {
        res.render("apps/promos", { promociones });
      })
      .catch(err => {
        console.log(err);
      });} 
})
.post('/send-email', function (req, res) {
  let userCorreo = req.user;
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'promedioironhack@gmail.com',
          pass: 'promedio1234'
      }
  });
  let mailOptions = {
      from: userCorreo.username + '<promedioironhack@gmail.com>', // sender address
      to: 'jose.martinez@wavetec.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body, // plain text body
      html: '<div style="text-align: center;"><img width="199" src="https://app2.dopplerfiles.com/Templates/116127/promedio-logo.png" alt="placeholder_170x100_real" style="clear:both;width:199px;max-width:100%;text-decoration:none;border-style:none;outline-style:none;-ms-interpolation-mode:bicubic;text-align:center;"></div><div style="text-align: center;"><span style="font-size: 36px; line-height: 1.1;" class="font-line-height-medium"><b><span style="color: rgb(71, 71, 71);">Consulta</span></b></span></div><div style="text-align: center;"><img ondragstart="return false;" width="275" src="https://app2.dopplerfiles.com/Templates/116127/question.png" alt="placeholder_560x260" style="clear:both;width:275px;max-width:100%;text-decoration:none;border-style:none;outline-style:none;-ms-interpolation-mode:bicubic;text-align:center;"></div><div style="text-align: center;"><span style="font-size: 18px; font-family: arial, &quot;helvetica neue&quot;, helvetica, sans-serif; line-height: 1.2;" class="font-line-height-large"><span style="color: rgb(71, 71, 71);">Contamos con una consulta para usted:</span></span></div><div style="text-align: center;"><p style="color: rgb(140, 140, 140); font-size: 18px; font-family: arial, &quot;helvetica neue&quot;, helvetica, sans-serif; line-height: 1.2;" class="font-line-height-large">' + userCorreo.username +': '+ req.body.body +'</p></div>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          res.render('apps/message');
      });
})
.get('/banorte', (req, res, next) => {
  const user = req.user;
  if(user){
    return res.merge('banks/banorte', {
      sourceUrl: 'https://www.banorte.com/',                             
      sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]' 
  });
  }
  return res.redirect("/login");
})
.get('/bbva', (req, res, next) => {
  const user = req.user;
  if(user){
    return res.merge('banks/bbva', {
      sourceUrl: 'https://www.bancomer.com/',                             
      sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]' 
  });
  }
  return res.redirect("/login");
})
.get('/citi', (req, res, next) => {
  const user = req.user;
  if(user){
    return res.merge('banks/citi', {
      sourceUrl: 'https://www.banamex.com/',                             
      sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]' 
  });
  }
  return res.redirect("/login");
})
.get('/hsbc', (req, res, next) => {
  const user = req.user;
  if(user){
    return res.merge('banks/hsbc', {
      sourceUrl: 'https://www.hsbc.com.mx/',                             
      sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]' 
  });
  }
  return res.redirect("/login");
})
.get('/santander', (req, res, next) => {
  const user = req.user;
  if(user){
    return res.merge('banks/santander', {
      sourceUrl: 'https://www.santander.com.mx/',                             
      sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]' 
  });
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

    //Google register
 
  router.get("/auth/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"]
  }));

  router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/private',
    failureRedirect : '/fail'
  }));

  

   router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/login");
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

  router.get('/Empleados', (req, res)=>{
    User.find()
      .then(Empelados =>{
        res.render('empleados', {Empelados})
      })
      .catch(err =>{
        console.log(err)
      })
  })


  router.post('/upload', upload.single('photo'), (req, res)=>{
    const {path} = req.body
    User.updateOne({_id:req.query.user_id}, {$set: {path}})
    .then(libro =>{
      res.redirect('/private2')
    })
    .catch(err=>console.log(err))
  })

  router.post('/buscar', (req, res)=>{
    let nombreEmpleado = req.body.username;
    User.find({title: {$regex: nombreEmpleado, $options: 'i'}})
    .populate('username')
    .then((empleado)=>{
      res.json(empleado)
    })
    .catch(err=>{
      console.log(err);
    })
  })
 

module.exports = router;



