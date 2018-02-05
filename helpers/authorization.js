module.exports = function(req, res, next){
    if(req.decoded.role === 'admin' || req.decoded.role === 'user'){
        next()
    }else{
        res.send({message: "you have no authorization (authorization)"})
    }
}