const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const Category = new Schema({
  name:{
    type:String,
    require:[true,'la categoria del post es obligatorio']
  },
  date:{
    type:Date,
    default: Date.now
  }
})

module.exports = model('category', Category);


