const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title:{
        type: String,
        requires:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "bloguser",
    },
    clicks:{
        type:Number,
        required:true,
        default:0,
    }
},{timestamps:true}
);

const Blog = model('blog', blogSchema);

module.exports = Blog;