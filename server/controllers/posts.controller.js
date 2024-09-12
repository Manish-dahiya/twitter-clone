
const posts=require("../models/posts.model")
const users=require("../models/user.model")
async function uploadPost(req,res){
    const {user,text}=req.body;
    const image=req.file;
    console.log(user)

    const postImg= image?image.filename:null//12325263ss.png
    try {
        const createdPost=await posts.create({
            user:user,
            image:postImg,
            text:text
        }) 
        const updateUser=await users.findByIdAndUpdate({_id:user},{$push:{posts:createdPost._id}});
        return res.status(200).json({response:"post created successfully",post:createdPost})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ response: 'Error creating post', error: error.message });
    }
}

async function getFeed(req,res){
    try {
        const allposts=await posts.find().populate("user").populate('comments.user'); 
        //  console.log(allposts)
        if(allposts.length>0){
            return res.status(200).json({response:allposts})
        }
        else{
            return res.status(400).json({response:"No Feed here for now !! Sorry"})
        }
    } catch (error) {
        console.log(error)
    }
}

async function deletePost(req,res){
    const {postId}=req.params

  try {
    const deletePost=await posts.findByIdAndDelete({_id:postId})
   
        return res.status(200).json({response:"delete Successfully"})
    
  } catch (error) {
    return res.status(400).json({response:"error in deleting post"})
  }
   
}

async function likePost(req,res){
    const {postId,userId,like}=req.body

    if(like){
        try {
            const addliketopost=await posts.findByIdAndUpdate({_id:postId},{$push:{likes:userId}})
            const addliketouser= await users.findByIdAndUpdate({_id:userId},{$push:{likes:postId}})
    
            return res.status(200).json({response:"post liked"})
        } catch (error) {
           return res.status(400).json({response:"error in liking the post"}) 
        }
    }
    else{
        try {
            const removeLikeFromPost=await posts.findByIdAndUpdate({_id:postId},{$pull:{likes:userId}})
            const removelikeFromUser=await users.findByIdAndUpdate({_id:userId},{$pull:{likes:postId}})
            return res.status(200).json({response:"unliked post"})
        } catch (error) {
            return res.status(200).json({response:"error in unliking post"})
        }
    }
}

async function addComment(req,res){
    const {userId,postId,comment}=req.body;
    try {
        const postComment=await posts.findByIdAndUpdate({_id:postId},{$push:{
          comments:{
            user:userId,
            text:comment
          }
        }
        })
        return console.log(postComment)

        return res.status(200).json({response:"commented successfully"})
    } catch (error) {
        return res.status(400).json({response:"error in commenting"})
    }
} 



module.exports={
    uploadPost,
    getFeed,
    deletePost,
    likePost,
    addComment
}