require("dotenv").config();

const express = require("express");
const path = require("path");
const userRoute = require("./routes/user.js");
const blogRoute = require("./routes/blog.js");
const mongoose = require("mongoose");
const Blog = require("./models/blog.js");
const topBlogsRoute = require("./routes/topblogs.js");

const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication.js");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then((e)=>console.log("mongo connected"));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req,res)=>{
     const allBlogs = await Blog.find({});
     res.render("home", {
          user: req.user,
          blogs:allBlogs,
     });
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);
app.use("/topblogs",topBlogsRoute);


app.listen(PORT, ()=>console.log(`server started at :${PORT}`));