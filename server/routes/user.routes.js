const express=require("express")
const router=express.Router()
const multer=require("multer")
const path=require("path")
const {signup,login}=require("../controllers/user.controller")

const filepath= path.join(__dirname,"../public/avatar")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filepath)
    },
    filename:function(req,file,cb){
        cb(null,new Date.now() + file.originalname)
    }
})

const upload=multer({storage:storage})

router.post("/login",login)
router.post("/signup",upload.single("avatar"),signup)

module.exports=router