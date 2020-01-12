const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// ingresar (login)
router.post('/', [
  check('email').isEmail(),
  check('password').isLength({
    min: 3
  })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    })
  }
  //  validar email con la base de datos
  let user = await User.findOne({
    email: req.body.email
  })
  if (!user) {
    return res.status(400).send('Usuario o contraseña incorrectos')
  }

  // validar la contraseña encriptada con la base de datos
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword){
    return res.status(400).send('Usuario o contraseña incorrectos')
  }
  
  // genrerar un token con una funcion del modelo user
  const token = user.generateJWT()
  res.status(200).header('token', token).json({
    title:'usuario ingresado',
    token: token
  })
  // res.json({
  //   status: 'usuario ingresado'
  // })
})

module.exports = router