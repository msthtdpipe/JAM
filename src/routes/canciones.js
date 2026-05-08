const router = require('express').Router();  
const ctrl = require('../controllers/cancionesController');   

router.get('/', ctrl.listar); 

module.exports = router; 