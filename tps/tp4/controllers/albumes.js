import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
   const [rows, fields] = await conn.query('SELECT * from albumes');
   res.json(rows);
};

const getAlbum = async (req, res) => {
   const id = req.params.id;
   const [rows, fields] = await conn.query('SELECT * from albumes where id = ?', [id]);
   res.json(rows);
};

const createAlbum = async (req, res) => {
   const nombre = req.body.nombre;
   const artista = req.body.artista;
   const [rows, fields] = await conn.query('INSERT INTO albumes (nombre, artista) VALUES (?, ?)', [nombre, artista]);
   res.send('Se ha creado el album correctamente!');
};

const updateAlbum = async (req, res) => {
   const id = req.params.id;
   const nombre = req.body.nombre;
   const artista = req.body.artista;
   const [rows, fields] = await conn.query('UPDATE albumes SET albumes.nombre = ? , albumes.artista = ? WHERE albumes.id = ?', [nombre, artista, id]);
   res.send('El album se ha actualizado correctamente!');
};

const deleteAlbum = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('DELETE from albumes where albumes.id = ?', [id]);
    res.send('El album se ha eliminado correctamente');
};

const getCancionesByAlbum = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT canciones.nombre, FROM canciones JOIN albumes ON canciones.album = albumes.id WHERE canciones.album = ?', [id]);
    res.json(rows)
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
