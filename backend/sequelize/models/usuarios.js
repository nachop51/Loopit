const { DataTypes, Model } = require('sequelize');
const sequelize = require('../orm')

const usuarios = sequelize.define('usuarios',{
    user: {type:DataTypes.STRING(50)},
    name: {type:DataTypes.STRING(50)},
    lastname: {type:DataTypes.STRING(50)},
    rol: {type:DataTypes.STRING(50)},
    pass:{type:DataTypes.STRING(256)}
})

// class usuarios extends Model {}
// usuarios.init({
//     user: DataTypes.STRING(50)  ,
//     name: DataTypes.STRING(50),
//     lastname: DataTypes.STRING(50),
//     rol: DataTypes.STRING(50),
//     pass: DataTypes.STRING(256),
// },{
//     sequelize,
//     modedlName: "usuarios"
// })

module.exports = usuarios;