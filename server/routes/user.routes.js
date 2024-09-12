const express=require("express")
const router=express.Router()
const multer=require("multer")
const path=require("path")
const {signup,login,getUserProfile,updateUserProfile,handleFollowUnfollow,getFollowers,getFolowing}=require("../controllers/user.controller")

const filepath= path.join(__dirname,"../public/avatar")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filepath)
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload=multer({storage:storage})

router.post("/login",login)
router.post("/signup",upload.single("avatar"),signup)
router.get("/getUserProfile/:userId",getUserProfile)
router.post("/editProfile",upload.single("avatar"),updateUserProfile)
router.post("/followUnfollow",handleFollowUnfollow)
router.get("/getfollowers/:userId",getFollowers)
router.get("/getfollowing/:userId",getFolowing)


module.exports=router