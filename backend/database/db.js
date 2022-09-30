const mysql = require('mysql2');

//pool de conexiones
const conexion = mysql.createPool({
    connectionLimit : 10,
    host: '54.94.125.72',
    user: 'loopit',
    password: 'loop',
    database: 'loopit'
});

module.exports = conexion