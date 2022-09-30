const router = require('express').Router()
const conexion = require('../database/db')
const users = require('../controllers/users')
const usuarios = require('../sequelize/models/usuarios')

//end point with sql
router.get('/usuarios', (req,res) => {
    if (req.user.rol !== "admin"){
        res.status(401).json({error: "acceso denegado, no sos admin"})
    }else{
        conexion.query('SELECT * FROM usuarios',(error,results)=>{
            if (error){
                throw error;
            }else{
                res.send(results)
            }
        })
    }
});
// end point with sequelize
router.get('/usuarios1',(req,res)=>{
    usuarios.findAll({
        attributes: ['user', 'pass']
      })
        .then(data =>{
            res.json(data)
        })
})

router.get('/admin', (req, res)=>{
    const rol = req.user.rol
    if(rol !== "admin"){
        res.status(401).json({error: "acceso denegado, no sos admin"})
    }else{
    res.status(200).json({
        state: "ok",
        user: req.user
    })
    }
})



router.get('/tasks', (req, res) =>{
    const rol = req.user.rol
    if(rol !== "admin"){
        res.status(401).json({error: "acceso denegado, no sos admin"})
    }else{
        conexion.query('SELECT * FROM tasks;', (error,results)=>{
            if (error){
                throw error;
            }else{
                res.json(results).cookie('hola','holaa')
            }
        })
    }
});

router.post('/register', users.register)
router.post('/login',users.login)
router.post('/logins',users.loginSequelize)
router.post('/updatepass', users.updatePass)
module.exports = router;
