const router =require('express').Router();
const {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
} = require('../controllers/mascotas');

router.get('/:id?', obtenerMascotas);
router.post('/',crearMascota);
router.put('/:id',modificarMascota);
router.delete('/:id',eliminarMascota);

module.exports = router;