const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary')
const fs = require('fs-extra');
const Blog = require('../models/Blog')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// leer 
router.get('/',auth, async (req, res) => {
  // res.send('API blog ira aqui')
  const Blogs = await Blog.find({}).populate('category', 'name')
  res.json(Blogs)
})

// leer visitas que estan permitidas
router.get('/show',async (req, res) => {
  // res.send('API blog ira aqui')
  const Blogs = await Blog.find({show: true}).populate('category', 'name')
  res.json(Blogs)
})

// leer visitas de mayor a menor
router.get('/views' ,async (req, res) => {
  // res.send('API blog ira aqui')
  const Blogs = await Blog.find({show: true}).sort({views: -1}).populate('category', 'name')
  res.json(Blogs)
})

// Leer un elemento
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('category', 'name');
  if(blog.show === false){
    const jwtToken = req.headers.token
    if (!jwtToken) return res.status(401).send('Acceso Denegado. Necesitamos un token valido')
    try {
      const payload = jwt.verify(jwtToken, process.env.SECRET_KEY)
      req.blog = payload
      await Blog.findByIdAndUpdate(req.params.id, {$inc : {views : 1}})
      res.json(blog);
    } catch (e) {
      res.status(400).send('Acceso Denegado. Token no valido')
    }
  }
   await Blog.findByIdAndUpdate(req.params.id, {$inc : {views : 1}})
    res.json(blog);
})


// Agregar
router.post('/',auth ,async (req, res) => {
  // const blog = new Blog(req.body)
  // console.log(req.body);
  // console.log(req.file);
  
  const {title,description,content,category,date,author,link,show} = req.body

  const result = await cloudinary.v2.uploader.upload(req.file.path,{
        folder: 'blog'
      });

  const blog = new Blog({
    title: title,
    description: description,
    date:date,
    author:author,
    content:content,
    category:category,
    link:link,
    show:show,
    // result.url | http
    // result.secure_url | https
    imageURL: result.secure_url,
    public_id: result.public_id
  })

  await blog.save()
  await fs.unlink(req.file.path)
  res.json({
    status: 'tarea guardada'
  })
})

// editar
router.put('/:id',auth,async (req, res) => {
  // console.log(req.params, req.body);
  await Blog.findByIdAndUpdate(req.params.id, req.body)
  res.json({
    status: 'tarea actualizada'
  })
})

// eliminar
router.delete('/:id',auth ,async (req, res) => {
  const {id} = req.params;
  const blog = await Blog.findByIdAndDelete(id)
  const result = await cloudinary.v2.uploader.destroy(blog.public_id)
  res.json({
    status: 'tarea eliminada'
  })
})

module.exports = router;