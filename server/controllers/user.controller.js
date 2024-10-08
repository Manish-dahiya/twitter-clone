
const joi=require("joi")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const users=require("../models/user.model.js")
const { response } = require("express")
const private_key=process.env.PRIVATE_KEY

async function signup(req,res){
    const {username,email,password}=req.body
    const avatar=req.file
   
    const userJoiSchema=joi.object({
        username:joi.string().min(3).max(12).alphanum().required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(8).required()
    })

    const check=userJoiSchema.validate({username,email,password})

    if(check.error){
        const message=check.error.details[0].message
        return res.status(400).json({response:message});
    }

    const isEmailExists=await users.findOne({email:email})
    const isUsernameExists=await users.findOne({username:username})

    if(isEmailExists || isUsernameExists){
        return res.status(400).json({response:"username or email already exists"})
    }
    
    const hashedPassword=await bcrypt.hash(password,10);
    const userAvatar=avatar?avatar:null
    const createdUser=await users.create({
        username,
        email,
        password:hashedPassword,
        avatar:userAvatar
    })

    console.log(createdUser)
    const data={id:createdUser._id,username,email}
    const token=jwt.sign(data,private_key)

    return res.status(200).json({response:"user created successfully",token:token})

}


async function login(req,res){
    const {email,password}=req.body

    const isEmailExists=await users.findOne({email:email})
    if(!isEmailExists){
        return res.status(400).json({response:"user does not exists"})
    }

    const comparePassword=await bcrypt.compare(password,isEmailExists.password)
    if(!comparePassword){
        return res.status(400).json({response:"incorrect credentials"})
    }

    const data={
        id:isEmailExists._id,
        username:isEmailExists.username,
        email:email
    }

    const token=jwt.sign(data,private_key)
   console.log("logged in user",isEmailExists)
   return res.status(200).json({response:"user logged-in successfully",token:token})


}

async function getUserProfile(req,res){
    const {userId}=req.params

    try {
        const profileData=await users.find({_id:userId}).populate("posts")
        if(profileData){
            return res.status(200).json({response:profileData})
        }
        else{
            return res.status(400).json({response:"unable to fetch the profile try logging again"})
        }
    } catch (error) {
        console.log(error)
    }


}

async function updateUserProfile(req,res){
    const {id,username}=req.body;
    const avatar=req.file;

   try {
    const updateUser=await users.updateOne({_id:id},{username:username})

    if(avatar){
        const updateavatar=await users.updateOne({_id:id},{avatar:avatar.filename})
    }
    return res.status(200).json({response:"profile updated successfully"})
    
   } catch (error) {
    return res.status(400).json({response:"error in updating profile"})
   }
}


async function handleFollowUnfollow(req,res){
    const {userId,followerId,follow}=req.body;

    if(follow){
       try {
        const a= await users.findByIdAndUpdate({_id:userId},{$push:{followers:followerId}})
        const b= await users.findByIdAndUpdate({_id:followerId},{$push:{following:userId}})
        return res.status(200)
       } catch (error) {
        return res.status(400)
       }
    }
    else{
       try {
        const a =await users.findByIdAndUpdate({_id:userId},{$pull:{followers:followerId}})
        const b= await users.findByIdAndUpdate({_id:followerId},{$pull:{following:userId}})
        return res.status(200)
       } catch (error) {
        res.status(400)
       }

    }
}
async function getFollowers(req,res){
    const {userId}=req.params
    try {
        const data=await users.find({_id:userId}).populate("followers")
        return res.status(200).json({response:data[0].followers})
    } catch (error) {
        console.log(error)
    }
}
async function getFolowing (req,res){
    const {userId}=req.params
    try {
        const data=await users.find({_id:userId}).populate("following")
        return res.status(200).json({response:data[0].following})
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers(req,res){
    try {
        const allUsers=await users.find()
        return res.status(200).json({response:allUsers})
    } catch (error) {
        return res.status(400).json({response:"error in fetching users"})
    }
}

module.exports={
   signup,
   login,
   getUserProfile,
   updateUserProfile,
   handleFollowUnfollow,
   getFollowers,
   getFolowing,
   getAllUsers
}