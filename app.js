//Importación de los módulos necesarios
//Aquí se importan los módulos express y sqlite3. express es un framework web para Node.js que facilita la creación de aplicaciones web y la definición de rutas
//mientras que sqlite3 es un módulo que proporciona una API para interactuar con bases de datos SQLite desde Node.js.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const dbPath = './database.db';

//creacion de la base de datos
const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Error al abrir o crear la base de datos:', error.message);
  } else {
    console.log('Conexión exitosa con la base de datos SQLite');
    createTable();
  }
});

const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT
    )
  `;
  db.run(sql, (error) => {
    if (error) {
      console.error('Error al crear la tabla usuarios:', error.message);
    }
  });
};

app.use(express.json());

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM usuarios WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

// Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.run(sql, [nombre, correo], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const sql = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?';
  db.run(sql, [nombre, correo, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: 'Usuario actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});

process.on('SIGINT', () => {
  db.close((error) => {
    if (error) {
      console.error('Error al cerrar la base de datos:', error.message);
    } else {
      console.log('Conexión cerrada con la base de datos SQLite');
    }
    process.exit(0);
  });
});

//eliminar usuario curl -X DELETE http://localhost:3000/usuarios/{id}

//ver lista de usuarios curl http://localhost:3000/usuarios

//curl -X POST -H "Content-Type: application/json" -d '{"nombre": "", "correo": ""}' http://localhost:3000/usuarios


//para iniciar el app.js tenemos que usar el comando node app.js y nos dira el siguiente mensaje
//PS C:\Users\Esteban Gomez\Documents\Universidad\Infra\prueba1> node app.js
//Servidor Node.js escuchando en el puerto 3000
//Conexión exitosa con la base de datos SQLite//