const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')

// leer los datos
router.get('/', auth, async (req, res) => {
  const Users = await User.find({})
  res.json(Users)
})

// leer un solo dato
router.get('/:id', auth,async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send('No hemos encontrado un usuario con ese ID')
  }
  res.json(user)
})

// Agregar datos
router.post('/', auth, [
  check('name').isLength({min:3}),
  check('email').isEmail(),
  check('password').isLength({min:3})
],async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()})
  }
  // validar si el email ya existe
  let validarEmail = await User.findOne({email: req.body.email}) 
  if (validarEmail) {
    return res.status(400).send('el usuario ya existe')
  }
  // encriptación de contraseña
  const salt  = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

 
  user = new User({
    name:req.body.name,
    email:req.body.email,
    password: hashPassword
  })
  const result = await user.save()

  // genrear un token con una funcion del modelo user
   const token = user.generateJWT()

   // const user = new User(req.body)
   // await user.save()

  res.header('Authorization',token).json({
    status: 'dato guardado'
  })
})

// Actualizar datos
router.put('/:id', auth,async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  if (!user) {
    return res.status(404).send('No hemos encontrado un usuario con ese ID')
  }
  res.json({
    status: 'dato actualizado'
  })
})

  // eliminar
  router.delete('/:id', auth, async (req, res) => {
    const {
      id
    } = req.params;
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).send('No hemos encontrado un usuario con ese ID')
    }
    res.json({
      status: 'dato eliminado'
    })
  })


module.exports = router;