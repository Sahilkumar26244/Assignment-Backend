const jwt = require('jsonwebtoken');
const {Dealer} = require("../models/dealerModel");

const protect = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error:"you must be logged in!"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,'sahilkr26244',(err,payload) => {
        if(err){
            return res.status(401).json({error:"You must be logged in!"})
        }
        const {dealerId} = payload
        Dealer.findById(dealerId).then(dealerdata => {
            req.dealer = dealerdata
            next()
        })
    })
}

module.exports = {protect}