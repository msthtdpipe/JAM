const db = require('../config/conexion');

exports.crearReporte = async (req, res) => {
  try {

    const {
      cancion_id,
      tipo,
      descripcion
    } = req.body;

    await db.query(
      `
      INSERT INTO reportes
      (
        cancion_id,
        tipo,
        descripcion
      )
      VALUES (?, ?, ?)
      `,
      [
        cancion_id || null,
        tipo,
        descripcion
      ]
    );

    res.status(201).json({
      mensaje: 'Reporte enviado correctamente'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};