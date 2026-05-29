const router = require('express').Router();
const ctrl = require('../controllers/generosController');

router.get('/', ctrl.listar);

module.exports = router;