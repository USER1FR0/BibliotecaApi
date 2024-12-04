const express = require('express');
const eventos = express.Router();
const mysql = require('mysql2');

const dbConfig = {
  host: 'bymxdaf31douy5j8cbkl-mysql.services.clever-cloud.com',
  user: 'ua6pm8lfvpmwbilm',
  password: 'aPEPJS2XF4FED7fKzFEH',
  database: 'bymxdaf31douy5j8cbkl'
};
  
  const pool = mysql.createPool(dbConfig);


// Crear evento
eventos.post('/createEvento', (req, res) => {
    const { Nombre, Latitud, Longitud, Fecha, Descripcion } = req.body;
    const estatus = new Date(Fecha) > new Date() ? 'Activo' : 'Pasado';
    const formattedFecha = new Date(Fecha).toISOString().split('T')[0]; // Formatear la fecha
    const query = 'INSERT INTO Eventos (NombreEvento, Latitud, Longitud, Fecha, Descripcion, estatus) VALUES (?, ?, ?, ?, ?, ?)';
  
    pool.query(query, [Nombre, Latitud, Longitud, formattedFecha, Descripcion, estatus], (error, result) => {
      if (error) {
        console.error('Error al crear el evento:', error);
        return res.status(500).json({ error: 'Error al crear el evento' });
      }
      res.status(201).json({ message: 'Evento creado exitosamente', id: result.insertId });
    });
  });
  
  // Actualizar evento
  eventos.put('/updateEvento/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, latitud, longitud, fecha, descripcion } = req.body;
    const estatus = new Date(fecha) > new Date() ? 'Activo' : 'Pasado';
    const formattedFecha = new Date(fecha).toISOString().split('T')[0]; // Formatear la fecha
    const query = 'UPDATE Eventos SET NombreEvento = ?, Latitud = ?, Longitud = ?, Fecha = ?, Descripcion = ?, estatus = ? WHERE IdEvento = ?';
  
    pool.query(query, [nombre, latitud, longitud, formattedFecha, descripcion, estatus, id], (error) => {
      if (error) {
        console.error('Error al actualizar el evento:', error);
        return res.status(500).json({ error: 'Error al actualizar el evento' });
      }
      res.status(200).json({ message: 'Evento actualizado correctamente' });
    });
  });  

//Leer eventos 

eventos.get('/eventos',(req,res)=>{
    const query = 'SELECT * FROM Eventos';
    pool.query(query,(error,result)=>{
        if(error){
            console.error('Error al obtener eventos: ',error);
            return res.status(500).json({error: 'Error al obtener eventos'});
        }
        res.status(200).json(result);
    });
});

//Leer evento por ID
eventos.get('/eventos/:id',(req,res)=>{
    const {id}=req.params;
    const query = 'SELECT * FROM Eventos WHERE IdEvento =?';
    pool.query(query,[id],(error,result)=>{
        if(error){
            console.error('Error al obtener evento: ',error);
            return res.status(500).json({error: 'Error al obtener evento'});
        }
        if(result.length===0){
            return res.status(404).json({error: 'El evento no existe'});
        }
        res.status(200).json(result[0]);
    });
});


//Eliminar evento
eventos.delete('/deleteEvento/:id',(req,res)=>{
    const {id}=req.params;
    const query = 'DELETE FROM Eventos WHERE IdEvento =?';

    pool.query(query, [id],(error)=>{
        if (error){
            console.error('Error al eliminar el evento: ',error);
            return res.status(500).json({error:'Error al eliminar el evento'});
        }
        res.status(200).json({message: 'Evento eliminado exitosamente'});
    });
});

//Obtener solo el/los eventos activos
eventos.get('/mapa',(req,res)=>{
    const query = 'SELECT NombreEvento,Latitud,Longitud, Descripcion FROM Eventos WHERE estatus = "Activo"';
    pool.query(query,(error,result)=>{
        if(error){
            console.error('Error al obtener eventos activos: ',error);
            return res.status(500).json({error: 'Error al obtener eventos activos'});
        }
        res.status(200).json(result);
    });
});

module.exports = eventos;
