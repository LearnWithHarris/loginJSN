const models = require('../models')
const bcrypt = require('bcrypt')

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
      res.status(200).send(one)
    })
    .catch(err=>{
      console.log(err)
      res.status(404).send("Data Not Found")
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
      res.status(201).send("Data has been created")
    })
    .catch(err=>{
      console.log(err)
      res.status(304).send(err)
    })
}
  
const destroy = (req, res)=>{
    User.destroy({where: {id: req.params.id}})
    .then(data=>{
      res.status(201).send("Data has been deleted")
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
  

module.exports = {
    findAll, findOne, create, destroy, update
}