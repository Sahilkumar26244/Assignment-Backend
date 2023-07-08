const express = require('express');
const {protect} = require("../middlewares/requireLogin");
const { createPost, getAllPosts, getDealerPost } = require('../controllers/dealerPostController');

const router = express.Router();

router.route("/").post(protect,createPost);
router.route("/getAllPosts").get(getAllPosts);
router.route("/dealerpost").get(protect,getDealerPost)

module.exports = router