function logger(req, res, next) {
    res.send({message: `${req.method}, ${req.url}`})
}

function vallidation(req, res, next) {
    
}