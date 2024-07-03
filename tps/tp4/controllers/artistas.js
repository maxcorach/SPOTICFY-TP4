import { conn } from "../db.js";

const getArtistas = async (_, res) => {
   const [rows, fields] = await conn.query('SELECT * from artistas');
   res.json(rows);
};

const getArtista = async (req, res) => {
   const id = req.params.id;
   const [rows, fields] = await conn.query('SELECT * from artistas where artistas.id = ?', [id]);
   res.json(rows);
};

const createArtista = async (req, res) => {
   const nombre = req.body.nombre;
   const [rows, fields] = await conn.query('INSERT INTO artistas (nombre) VALUES (?)', [nombre]);
   res.send('Se ha creado el artista correctamente!');
};

const updateArtista = async (req, res) => {
   const id = req.params.id;
   const nombre = req.body.nombre;
   const [rows, fields] = await conn.query('UPDATE artistas SET artistas.nombre = ? where artistas.id = ?', [nombre, id]);
   res.send('El artista se ha actualizado correctamente!');
};

const deleteArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('DELETE from artistas where artistas.id = ?', [id])
    res.send('El artista se ha eliminado correctamente!');
};

const getAlbumesByArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT albumes.nombre, artistas.nombre FROM albumes JOIN artistas ON artistas.id WHERE artistas.id = ?', [id]);
    res.json(rows);
};

const getCancionesByArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT canciones.nombre from canciones JOIN albumes ON canciones.album = albumes.id JOIN artistas ON albumes.artista = artistas.id where artistas.id = ?', [id]);
    res.json(rows);
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
