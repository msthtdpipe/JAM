const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/canciones', require('./routes/canciones'));

// Ruta para la raíz (Home)
app.get('/', (req, res) => {
    res.send('<h1>FUNCIONA</h1>');
});

module.exports = app;
app.set('trust proxy', false);