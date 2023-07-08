const express = require('express');
const {Post} = require("../models/dealerPostModel");

const createPost = (req,res) => {
    const {title,image,description,price,colour,mileage} = req.body;

    try {
        const post = new Post({
            title,
            image,
            description,
            price,
            colour,
            mileage,
            postedBy:req.dealer
        })
        post.save().then(result => {
            res.json({post:result})
        })
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getAllPosts = (req,res) => {
    Post.find()
    .populate("postedBy","firstName lastName")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
}

const getDealerPost = (req,res) => {
    Post.find({postedBy:req.dealer._id})
    .populate("postedBy","_id firstName lastName")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
}


module.exports = {createPost,getAllPosts,getDealerPost}