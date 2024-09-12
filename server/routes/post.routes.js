const express=require("express")
const router=express.Router()
const multer=require("multer")
const path=require("path")
const {uploadPost,getFeed,deletePost,likePost,addComment}=require("../controllers/posts.controller.js")

const filepath=path.join(__dirname,"../public/post")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filepath)
    },
    filename:function(req,file,cb){
        cb(null, Date.now() +  file.originalname)
    }
})

const upload=multer({storage:storage})


router.post("/create-post",upload.single("image"),uploadPost)
router.get("/getFeed",getFeed)
router.get("/deletePost/:postId",deletePost);
router.post("/likePost",likePost)
router.post("/comment",addComment)


module.exports=router