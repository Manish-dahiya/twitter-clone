
const joi=require("joi")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const users=require("../models/user.model.js")
const { response } = require("express")
const private_key=process.env.PRIVATE_KEY

async function signup(req,res){
    const {username,email,password}=req.body

   
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
    const createdUser=await users.create({
        username,
        email,
        password:hashedPassword
    })

    console.log(createdUser)
    const data={id:createdUser._id,username,email}
    const token=jwt.sign(data,private_key)

    return res.status(200).json({response:"user created successfully",token:token})

}


async function login(req,res){
    const {email,password}=req.body

    //1.check if the email exits or not 2.compare the pass

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
   return res.status(200).json({response:token})


}


module.exports={
   signup,
   login
}