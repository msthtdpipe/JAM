const db = require('../config/conexion');

exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, nombre
      FROM generos
      ORDER BY nombre ASC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};