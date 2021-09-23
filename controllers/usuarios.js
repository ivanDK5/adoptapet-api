const mongoose =require('mongoose');
const Usuario =mongoose.model('Usuario');
const passport= require('passport');

//CRUD

function crearUsuario(req,res,next){
 const body=req.body, password=body.password;
 delete body.password;
 const user =new Usuario(body);
 user.createPassword(password);
 user.save()
 .then(user=>{
   return res.status(200).json(user.toAuthJSON())
 })
 .catch(next)
}

function obtenerUsuarios(req,res,next){
  Usuario.find()
  .then(user=>{
    res.json(user.publicData())
  })
  .catch(next);
}

function modificarUsuario(req,res,next){
  Usuario.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
  .then(user=>{
    res.status(200).json(user.publicData())
  }).catch(next)
 
}

function eliminarUsuario(req,res){
  Usuario.findByIdAndDelete({_id: req.usuario.id})
  .then(r=>res.status(200).send('Usuario eliminado'))
  .catch(next)
}

function iniciarSesion(req,res,next){
  if(!req.body.email || !req.body.password){
    return res.status(422).json({error:{email:'falta informacion'}})
  }

  passport.authenticate('local',
  {session:false },
  function(err,user,info){
    if(err){return next(err)}
    if(user){
      user.token=user.generaJWT();
    }else{
      return res.status(422).json(info);
    }
  })(req,res,next)
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion
}
