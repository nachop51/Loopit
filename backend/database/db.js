const mysql = require('mysql2');

//pool de conexiones
const conexion = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'valentin',
    password: 'valentin',
    database: 'login'
});

module.exports = conexion