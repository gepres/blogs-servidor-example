const mongoose = require('mongoose');
const { Schema } = mongoose;

const Blog = new Schema({
  title:{
    type:String,
    require:[true,'El titulo del post es obligatorio']
  },
  author:{
    type:String,
    default:'Genaro Pretill',
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    require: [true, 'La descripción del post es obligatorio']
  },
  content:{
    type: String,
    require: [true, 'El contenido del post es obligatorio']
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'category'
  },
  link:String,
  views: {
    type: Number,
    default: 0
  },
  imageURL:String,
  public_id:{
    type: String,
    unique:true
  },
  show:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model('Blog', Blog);