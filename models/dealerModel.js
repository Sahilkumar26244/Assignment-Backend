const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const dealerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{type:String,enum:["Dealer"],required:true}
})

const Dealer = mongoose.model("Dealer" , dealerSchema)

module.exports = {Dealer}