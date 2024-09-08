
const posts=require("../models/posts.model")

async function uploadPost(req,res){
    const {user,text}=req.body;
    const image=req.file;
    console.log(user)

    const postImg= image?image:null
    try {
        const createdPost=await posts.create({
            user:user,
            image:postImg,
            text:text
        }) 

        return res.status(200).json({response:"post created successfully",post:createdPost})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ response: 'Error creating post', error: error.message });
    }
}

module.exports={
    uploadPost
}