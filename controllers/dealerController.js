const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Dealer} = require("../models/dealerModel");
require("dotenv").config();


const dealerRegister = async(req,res) => {
    const {firstName,lastName,email,password} = req.body;

    const Role = "Dealer"
    if(!email || !password || !firstName || !lastName)
    {
        return res.status(422).json({error:"please add all fields !"})
    }
    try {
        const auth_dealer = await Dealer.findOne({email});

        if(auth_dealer)
        {
            return res.status(403).send({msg:"Dealer are already exists!"});
        }
        else
        {
            bcrypt.hash(password,5,async function (err,hash){
                if(err){
                    return res.status(501).send(err);
                }
                try {
                    const new_dealer = new Dealer({
                        firstName,
                        lastName,
                        email,
                        password:hash,
                        role:Role
                    });
                    await new_dealer.save();
                    return res.status(201).send({msg:"Signup Successfully"})
                } catch (error) {
                    return res.status(403).send(error)
                }
            })
        }
    } catch (error) {
        return res.status(500).send(err)
    }
}

const dealerLogin = async(req,res) => {
    const {email,password} = req.body;

    const validDealer = await Dealer.findOne({email});

    if(validDealer)
    {
        const dealerId = validDealer._id;
        const hash = validDealer.password;
        const firstName = validDealer.firstName;
        const lastName = validDealer.lastName;
        const role = validDealer.role;

        try {
            await bcrypt.compare(password,hash,async function(err,result){
                if(err){
                    return res.status(500).send(err)
                }
                if(result){
                    const token = jwt.sign({dealerId},process.env.SECRET_KEY);
                    return res.status(201).send({"msg":"Login Success!",token:token,firstName:firstName,lastName:lastName,email:email,role:role})
                }
                else{
                    return res.status(401).send({"msg":"Login Failed please check email & password!"})
                }
            })
        } catch (error) {
            return res.status(401).send({"msg":"Login Failed!"})
        }
    }
    else {
        return res.status(401).send({ "msg": "Login failed!" })
    }
}

module.exports = {dealerRegister,dealerLogin}