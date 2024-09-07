const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    avatar:{
        type:String,
        default:null
    },
    following:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default:null
       }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            default:null
        }
    ],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"posts",
            default:null
        }
    ]
})

const users=mongoose.model("users",userSchema)

module.exports=users