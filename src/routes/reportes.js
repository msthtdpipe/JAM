const router = require('express').Router();
const ctrl = require('../controllers/reportesController');

router.post('/', ctrl.crearReporte);

module.exports = router;