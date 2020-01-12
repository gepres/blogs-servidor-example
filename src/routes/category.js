const express = require('express');
const router = express.Router();
const Category = require('../models/Category')
const auth = require('../middleware/auth')

// leer datos
router.get('/', async (req, res) => {
  const category = await Category.find({})
  res.json(category)
})

// leer un dato
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json(category);
})


// Agregar datos
router.post('/', auth,async (req, res) => {
  const category = new Category(req.body)
  await category.save()
  res.json({
    status: 'dato agregado'
  })
})

//Actualizar datos
router.put('/:id', auth, async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, req.body)
  res.json({
    status: 'dato actualizado'
  })
})


// Eliminar datos
router.delete('/:id', auth, async (req, res) => {
  const {id} = req.params;
  const category = await Category.findByIdAndDelete(id)
  res.json({
    status: 'dato eliminado'
  })
})
module.exports = router;
