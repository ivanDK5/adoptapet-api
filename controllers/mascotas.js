/* const Mascota = require('../models/Mascota'); */
 const mongoose = require('mongoose');
 const Mascota = mongoose.model('Mascota');
//CRUD

function crearMascota(req,res,next){
  let mascota =new Mascota(req.body);
  mascota.save().then(mascota=>{
    res.status(200).send(mascota)
  }).catch(next);
}

function obtenerMascotas(req,res,next){
  if(req.params.id){
    Mascota.findById(req.params.id)
    .then(mascota=>{res.status(200).send(mascota)})
    .catch(next)
  }else{
    Mascota.find()
    .then(mascotas=>{res.status(200).send(mascotas)})
    .catch(next)
  }
 
}

function modificarMascota(req,res,next){
  Mascota.findById(req.params.id)
  .then(mascota=>{
    if(!mascota){
     return  res.status(401);
    }
    let nuevaInfo=req.body;
    if(typeof nuevaInfo.nombre!=='undefined')
      mascota.nombre=nuevaInfo.nombre
    
      mascota.save()
      then(updated=> {
        res.status(200).json(updated.publicData())
      })
  })
  .catch(next)
}

function eliminarMascota(req,res){
  Mascota.findOneAndDelete({_id:req.params.id})
  then(r=> {res.status(200).send('La mascota se elimino')})
  .catch(next)
}


module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
}
