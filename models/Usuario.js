/* class Usuario{
  constructor(id,username,nombre,apellido,email,password,tipo) {
    this.id=id;
    this.username=username;
    this.nombre=nombre;
    this.apellido=apellido;
    this.email=email;
    this.password=password;
    this.tipo=tipo;

  }
}

module.exports=Usuario; */

const mongoose = require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');
const crypto =require('crypto');
const jwt =require('jsonwebtoken');
const secret= require('../config').secret;
const UsuarioSchema = new mongoose.Schema({
  username: {type:String,
    unique:true,
    required:[true,'No puede estar vacio el campo username'],
    lowercase:true,
    match:[/^[a-z0-9]+$/, 'username invalido']
  },
nombre: {type:String,required:true},
  apellido: {type:String, required:true},
  email: {type:String, unique:[true,'falta email'],match:[/\s+@\s+.\s+/,'Email invalido'],index:true},
  tipo:{type:String,enum:['normal','anunciante']},
  hash:String,
  salt:String
},{collection:'usuarios',timestamps:true});

UsuarioSchema.plugin(uniqueValidator,{message:'Ya existe'})

UsuarioSchema.methods.publicData = () => {
  return {
    id: this.id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo: this.tipo
  }
}

UsuarioSchema.methods.createPassword= function(password){
  this.salt =crypto.randomBytes(16).toString('hex');
  this.hash =crypto.pbkdf2(password,this.salt,10000,512,'sha512')
  .toString('hex'); 
}

UsuarioSchema.methods.validatePassword = function (password){
  const newHash =crypto.pbkdf2(password,this.salt,10000,512,'sha512')
  toString('hex');
  return this.hash===newHash;
}

UsuarioSchema.methods.generaJWT = function(){
  const today=new Date();
  const exp =new Date(today);
  exp.setDate(today.getDate()+60);
  return jwt.sign({
    id: this._id,
    username:this.username,
    exp:parseInt(exp.getTime()/1000)
  },secret)


}


UsuarioSchema.methods.toAuthJSON =function(){
  return {
    username:this.username,
    email:this.email,
    token:this.generaJWT()
  }
}



mongoose.model('Usuario',UsuarioSchema);