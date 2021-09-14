/* class Solicitud{
  constructor(id, idMascota, fechaDeCreacion, idUsuarioAnunciante, idUsuarioSolicitante, estado) {
    this.id = id;
    this.idMascota = idMascota;
    this.fechaDeCreacion = fechaDeCreacion;
    this.idUsuarioAnunciante = idUsuarioAnunciante;
    this.idUsuarioSolicitante = idUsuarioSolicitante;
    this.estado = estado;
  }

}

module.exports=Solicitud; */

const mongoose = require('mongoose');
const SolicitudSchema = new mongoose.Schema({
  mascota:{type:mongoose.Schema.Types.ObjectId, ref:'Mascota',required:true},
  anunciante: {type:mongoose.Schema.Types.ObjectId, ref:'Usuario',required:true},
  solicitante:{type:mongoose.Schema.Types.ObjectId, ref:'Usuario',required:true},
  estado: {type:String, required:true},
  
},{collection:'solicitudes',timestamps:true});  

SolicitudSchema.methods.publicData = () => {
  return {
    mascota: this.mascota,
    anunciante: this.anunciante,
    solicitante: this.solicitante,
    estado: this.estado,
  }
}

mongoose.model('Solicitud',SolicitudSchema);

