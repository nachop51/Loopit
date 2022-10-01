const conexion = require('../database/db')
const mpq = require('mysql-query-placeholders')
const bcrypt = require('bcrypt');
const key = require('../config').key
const jwt = require('jsonwebtoken')
const usuarios = require('../sequelize/models/usuarios')

const login = async (req, res) =>{
    let { body } = req;
    let { username, password , email} = body;
    if (email !== undefined){
        let query = mpq.format('SELECT * FROM users WHERE email = ?', [email])
    }else{
        let query = mpq.format('SELECT * FROM users WHERE username = ?', [username])
    }
    conexion.query(query, async (error,results)=>{
        if (error){
            throw error;
        }else{
            if(results.length == 0){
                res.status(400).json({
                    state:"ese usuario no esta registrado"
                })
            }else{
                let passBD = results[0].password
                let compare = await bcrypt.compare(password, passBD);
                if (!compare){
                    res.status(400).json({
                        state:"contraseña o usuario equivocado"
                    })
                }else{
                    token = jwt.sign({
                        id: results[0].id,
                        name: results[0].username
                    }, key)
                    res.status(200).header('auth-token',token).json({
                        state:"entraste",
                        data:user,
                        token:token
                    })
                }
            }
        }
    });
}

const regis = async (req, res) =>{
    const { body }= req
    const { username, fullname, rol, pass, email } = body
    conexion.query('SELECT username FROM users WHERE ?',{username:username}, async (error,results)=>{
        if(error){
            throw error;
        }else if(results.length == 0){
            const passcrypt = await bcrypt.hash(pass, 8)
            const create_at = (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
            conexion.query('INSERT INTO users SET ?',{ username:username, full_name:fullname, email:email, password:passcrypt, create_at:create_at, update_at:create_at },(error,results)=>{
                if (error){
                    throw error;
                }else{
                    res.status(200).json({
                    state:"registrado",
                    username: username
                    })
                }
            });
        }else{
            res.status(401).json({
                state: "ese user ya esta registrado"
            })
        }
    })
    }
    

const updatePass = (req, res) => {
    const user = req.body.user
    const pass = req.body.pass
    const newpass = req.body.newpass
    conexion.query("SELECT pass FROM usuarios WHERE ?",{user:user}, async (error, results)=>{
        const passBD = results[0].pass
        const compare = await bcrypt.compare(pass,passBD)
        if (!compare){
            res.status(401).json({
                state: "error",
                error: "contraseña equivocada"
            })
        }else{
            newpasscrypt = await bcrypt.hash(newpass, 8)
            conexion.query('UPDATE usuarios SET pass = ? WHERE user = ?',[newpasscrypt, user], (error,results)=>{
                if (error){
                    throw error
                }else{
                    res.status(200).json({
                        state: "contraseña cambiada"
                    })
                }
            }) 
        }   
    })
}

module.exports = {
    login: login,
    register: regis,
    updatePass: updatePass
}