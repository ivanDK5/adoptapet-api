/* const solicitud = require('../models/solicitud'); */
const mongoose = require('mongoose');
const Solicitud = mongoose.model('solicitud');
//CRUD

function crearSolicitud(req,res,next){
 let Solicitud =new Solicitud(req.body);
 solicitud.save().then(solicitud=>{
   res.status(200).send(solicitud)
 }).catch(next);
}

function obtenerSolicitudes(req,res,next){
 if(req.params.id){
   Solicitud.findById(req.params.id)
   .then(solicitud=>{res.status(200).send(solicitud)})
   .catch(next)
 }else{
   solicitud.find()
   .then(solicitudes=>{res.status(200).send(solicitudes)})
   .catch(next)
 }

}

function modificarSolicitud(req,res,next){
 Solicitud.findById(req.params.id)
 .then(solicitud=>{
   if(!solicitud){
    return  res.status(401);
   }
   let nuevaInfo=req.body;
   if(typeof nuevaInfo.nombre!=='undefined')
     solicitud.nombre=nuevaInfo.nombre
   
     solicitud.save()
     then(updated=> {
       res.status(200).json(updated.publicData())
     })
 })
 .catch(next)
}

function eliminarSolicitud(req,res){
 Solicitud.findOneAndDelete({_id:req.params.id})
 then(r=> {res.status(200).send('La solicitud se elimino')})
 .catch(next)
}


function count(req,res,next){
 let categoria=req.params.id;
 Solicitud.aggregate([
   {'$match': {'_id':id}},
   {'$count':'total'}
 ]).then(r=>{
   res.status(200).send(r);
 })
 .catch(next);
}


module.exports = {
 crearSolicitud,
 obtenerSolicitudes,
 modificarSolicitud,
 eliminarSolicitud,
 count
}
