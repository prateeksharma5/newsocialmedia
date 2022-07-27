const express= require("express");
//const { createPost } = require("../controllers/post");
const {register}=require("../controllers/User")

const router=express.Router();


//router.route("/post/upload").post(createPost);

router.route("/register").post(register);


module.exports=router;