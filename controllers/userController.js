const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require("../models/userModel");
require("dotenv").config();


const userRegister = async(req,res) => {
    const {firstName,lastName,email,password} = req.body;

    const Role = "Customer"
    if(!email || !password || !firstName || !lastName)
    {
        return res.status(422).json({error:"please add all fields !"})
    }
    try {
        const auth_user = await User.findOne({email});

        if(auth_user)
        {
            return res.status(403).send({msg:"User are already exists!"});
        }
        else
        {
            bcrypt.hash(password,5,async function (err,hash){
                if(err){
                    return res.status(501).send(err);
                }
                try {
                    const new_user = new User({
                        firstName,
                        lastName,
                        email,
                        password:hash,
                        role:Role
                    });
                    await new_user.save();
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

const userLogin = async(req,res) => {
    const {email,password} = req.body;

    const validUser = await User.findOne({email});

    if(validUser)
    {
        const userId = validUser._id;
        const hash = validUser.password;
        const firstName = validUser.firstName;
        const lastName = validUser.lastName;
        const role = validUser.role;


        try {
            await bcrypt.compare(password,hash,async function(err,result){
                if(err){
                    return res.status(500).send(err)
                }
                if(result){
                    const token = jwt.sign({userId},process.env.SECRET_KEY);
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

module.exports = {userRegister,userLogin}