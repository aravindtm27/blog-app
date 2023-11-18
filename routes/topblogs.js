const { Router } = require("express");
const Blog = require("../models/blog");

const router = Router();

router.get("/", async(req,res)=>{
    const blogs = await Blog.find();
    return res.render("topblogs", {blogs:blogs});
})

module.exports= router;