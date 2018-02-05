const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded)=>{
        if(!err){
            req.decoded = decoded
            console.log(req.decoded)
        }else{
            res.send({message: err})
        }
        next()
    })
}