const router =require('express').Router();
const {
  crearSolicitud,
  obtenerSolicitudes,
  modificarSolicitud,
  eliminarSolicitud,
  count
} = require('../controllers/solicitudes');

router.get('/count/:id',count);
router.get('/:id?', obtenerSolicitudes);
router.post('/',crearSolicitud);
router.put('/:id',modificarSolicitud);
router.delete('/:id',eliminarSolicitud);

module.exports = router;