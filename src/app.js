const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('trust proxy', false);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/canciones', require('./routes/canciones'));
app.use('/api/generos', require('./routes/generos'));

module.exports = app;