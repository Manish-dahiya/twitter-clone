const express=require("express")
const router=express.Router()
const multer=require("multer")
const path=require("path")
const {uploadPost}=require("../controllers/posts.controller.js")

const filepath=path.join(__dirname,"../public/post")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filepath)
    },
    filename:function(req,file,cb){
        cb(null,new Date.now() +  file.originalname)
    }
})

const upload=multer({storage:storage})


router.post("/create-post",upload.single("image"),uploadPost)


module.exports=router