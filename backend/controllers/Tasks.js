const conexion = require('../database/db')

const addTasks = (req, res) =>{
    const name = req.body.name;
    const description = req.body.description;
    conexion.query('INSERT INTO tasks SET',{name: name, description: description}, (error,results) =>{
        if (error){
            throw error;
        }else{
            res.json(results);
        }
    })
}

module.exports = {
    addTasks: addTasks
};