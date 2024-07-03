import { conn } from "../db.js";

const getCanciones = async (_, res) => {
   const [rows, fields] = await conn.query('SELECT * from canciones');
   res.json(rows);
};

const getCancion = async (req, res) => {
   const id = req.params.id;
   const [rows, fields] = await conn.query('SELECT * from canciones where id = ?', [id]);
   res.json(rows);
};

const createCancion = async (req, res) => {
    const nombre = req.body.nombre
    const album = req.body.album
    const duracion = req.body.duracion
    const [rows, fields] = await conn.query('INSERT INTO canciones (nombre, album, duracion) VALUES (?,?,?)', [nombre, album, duracion]);
    res.send('La cancion se ha creado correctamente!');
};

const updateCancion = async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre
    const album = req.body.album
    const duracion = req.body.duracion
    const [rows, fields] = await conn.query('UPDATE canciones SET canciones.nombre = ? , canciones.album = ?, canciones.duracion = ? WHERE canciones.id = ?', [nombre, album, duracion, id]);
    res.send('La canción se ha actualizado correctamente!');
};

const deleteCancion = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('DELETE from canciones where canciones.id = ?', [id])
    res.send('La canción se ha eliminado correctamente!');
};

const reproducirCancion = async (req, res) => {
    const id = req.params.id;
    const [results, _] = await conn.query('SELECT reproducciones FROM canciones WHERE canciones.id = ?', [id]);
    const reproducciones = results + 1;
    const [rows, fields] = await conn.query('UPDATE canciones SET reproducciones = ? WHERE id = ?', [reproducciones, id])
    res.send('Se ha incrementado la reproducción de la canción!');
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;
