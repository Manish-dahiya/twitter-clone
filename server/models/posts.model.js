const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    image:{
        type:String,
        default:null
    },
    text:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    comments:[
        {
           user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
           } ,
           text:{
            type:String
           }
        }
    ]
})

const posts=mongoose.model("posts",postSchema)

module.exports=posts