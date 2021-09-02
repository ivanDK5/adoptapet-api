const Mascota = require('../models/Mascota');

//CRUD

function crearMascota(req,res){
  let Mascota= new Mascota(req.body);
  res.status(200).send(Mascota);
}

function obtenerMascotas(req,res){
  let Mascota1 = new Mascota(1,'Zeus','cat','url','Gato negro',1,'Queretaro');
  let Mascota2 = new Mascota(2,'Roco','cat','url','Gato gris',1,'Queretaro');
  res.send([Mascota1, Mascota2]);
}

function modificarMascota(req,res){
  let Mascota = new Mascota(req.params.id,'Zeus','cat','url','Gato negro',1,'Queretaro');
  let modificaciones=req.body;
  Mascota={...Mascota,...modificaciones}
  res.send(Mascota);
}

function eliminarMascota(req,res){
  res.status(200).send(`El Mascota ${req.params.id} se elimino`);
}


module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
}
