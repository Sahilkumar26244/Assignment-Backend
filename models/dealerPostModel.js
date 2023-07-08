const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:[{
        type:String,
        required:true
    }],
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    colour:{
        type:String,
        required:true
    },
    mileage:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"Dealer"
    }
},{timestamps:true})

const Post = mongoose.model("Post",postSchema);

module.exports = {Post}