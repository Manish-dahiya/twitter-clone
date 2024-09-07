const mongoose=require("mongoose")

mongoose.connect(process.env.DB_HOST)

const db=mongoose.connection

db.on("open",()=>{
    console.log("mongodb connected successfully")
})
db.on("error",(err=>{
    console.log("error in connection with mongodb",err)
}))

module.exports =db