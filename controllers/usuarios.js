const Usuario = require('../models/Usuario');

//CRUD

function crearUsuario(req,res){
  let usuario= new Usuario(req.body);
  res.status(200).send(usuario);
}

function obtenerUsuarios(req,res){
  let usuario1 = new Usuario(1,'juancho', 'Juan', 'Vega', 'juan@vega.com','juan@@vega.com','abc','normal');
  let usuario2 = new Usuario(2,'montse', 'Monserrat', 'Vega', 'montse@vega.com','123','anunciante');
  res.send([usuario1, usuario2]);
}

function modificarUsuario(req,res){
  let usuario = new Usuario(req.params.id,'juancho','Juan','Vega','juan@vega.com','juan@@vega.com','abc','normal');
  let modificaciones=req.body;
  usuario={...usuario,...modificaciones}
  res.send(usuario);
}

function eliminarUsuario(req,res){
  res.status(200).send(`El usuario ${req.params.id} se elimino`);
}


module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario
}
