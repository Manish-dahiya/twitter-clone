const express=require('express')
const app=express();
const dotenv=require("dotenv")
dotenv.config()
const port =process.env.PORT || 5000

const cors=require("cors")
app.use(cors());
app.use(express.json())


const db=require("./config/db.config.js")



app.use("/twizzy/users",require("./routes/user.routes.js"))
app.use("/twizzy/posts",require("./routes/post.routes.js"))








app.listen(port,()=>{
    console.log("server started at",port)
})
