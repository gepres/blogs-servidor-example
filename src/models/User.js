const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const jwt = require('jsonwebtoken');

const User = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})

User.methods.generateJWT = function() {
   return jwt.sign({_id:this._id,name:this.name}, process.env.SECRET_KEY)
}

module.exports = model('user', User);