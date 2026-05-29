const db = require('../config/conexion');

// GET /api/canciones — listar todas solo publicadas
exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.titulo, c.duracion_seg, c.archivo_url, c.portada_url,
             a.nombre AS artista, al.titulo AS album, g.nombre AS genero
      FROM canciones c
      LEFT JOIN artistas a ON c.artista_id = a.id
      LEFT JOIN albumes al ON c.album_id = al.id
      LEFT JOIN generos g ON c.genero_id = g.id
      WHERE c.publicada = TRUE
      ORDER BY c.subida_en DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};