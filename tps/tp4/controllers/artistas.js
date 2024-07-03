import { conn } from "../db.js";

const getArtistas = async (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
   const [rows, fields] = await conn.query('SELECT * from artistas');
   res.json(rows);
};

const getArtista = async (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
   const id = req.params.id;
   const [rows, fields] = await conn.query('SELECT * from artistas where artistas.id = ?', [id]);
   res.json(rows);
};

const createArtista = async (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
   const nombre = req.body.nombre;
   const [rows, fields] = await conn.query('INSERT INTO artistas (nombre) VALUES (?)', [nombre]);
   res.send('Se ha creado el artista correctamente!');
};

const updateArtista = async (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
   const id = req.params.id;
   const nombre = req.body.nombre;
   const [rows, fields] = await conn.query('UPDATE artistas SET artistas.nombre = ? where artistas.id = ?', [nombre, id]);
   res.send('El artista se ha actualizado correctamente!');
};

const deleteArtista = async (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;
    const [rows, fields] = await conn.query('DELETE from artistas where artistas.id = ?', [id])
    res.send('El artista se ha eliminado correctamente!');
};

const getAlbumesByArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT albumes.nombre', [id]);
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
