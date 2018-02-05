const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const User = models.User

const findAll = (req, res)=> {
    User.findAll()
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      console.log(err)
      res.status(404).send(err)
    })
}

  
const findOne = (req, res)=>{
    User.findOne({where: {id: req.params.id}})
    .then(one=>{
      res.status(200).send({message: "data found", data: one})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).send({message: "data not found"})
    })
}
  
const create = (req, res) => {
    let objData = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
      role: req.body.role
    }
    User.create(objData)
    .then(data=>{
      res.status(201).send({message: "data has been created", data: objData})
    })
    .catch(err=>{
      console.log(err)
      res.status(304).send(err)
    })
}
  
const destroy = (req, res)=>{
    User.destroy({where: {id: req.params.id}})
    .then(data=>{
      res.status(201).send({message: "data has been deleted"})
    })
    .catch(err=>{
      console.log(err)
      res.status(304).send(err)
    })
}
  
const update = (req, res)=> {
    let objData = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
      role: req.body.role
    }
    User.update(objData, {where: {id: req.params.id}})
    .then(data=>{
      res.status(201).send("Data updated")
    })
    .catch(err=>{
      console.log(err)
      res.status(409).send(err)
    })
}

const signIn = (req, res)=>{
    
    let objData = {
        username: req.body.username,
        password: req.body.password,
    }
    
    User.findOne({where: {username: req.body.username}})
    .then(dataOne=>{
        let objDataOne = {
            id: dataOne.id,
            username: dataOne.username,
            role: dataOne.role
        }
        bcrypt.compare(req.body.password,dataOne.password)
        .then(password =>{
            jwt.sign(objDataOne, process.env.SECRET_KEY, function(err, token){
                res.send({authentication: password,message: "your decoded has been built", token: token})
            })
        });  
    })
    .catch(err=>{
        res.status(404).send(err)
    })
}
  

module.exports = {
    findAll, findOne, create, destroy, update, signIn
}