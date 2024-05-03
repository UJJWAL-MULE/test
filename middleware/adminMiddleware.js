import userModel from "../Model/userModel.js";
import JWT from 'jsonwebtoken'

export const isAdmin=async(req,res,next)=>{

  try {
    const user =await userModel.findById(req.params.id)
 

  if(!user){
    res.status(404).send({
      success:false,
      message:"user data not found"
    })
  }

  if(user.role !== 1){
    res.status(401).send({
      success:false,
      message:"unauthorized user"

    })
  }
  else{
    next()
  }
  } catch (error) {
    
  }
  
}


export const SignIn= async (req,res,next)=>{
try {
  // const decode= await JWT.verify(req.header.Authorization,process.env.secret_key)

  //console.log(req.header('Authorization'))

  const token=req.header('Authorization')
  console.log(token)

 // await JWT.verify(token,process.env.secret_key)

 const decode=JWT.verify(token,process.env.secret_key)
  req.user=decode
  next()
 
} catch (error) {
  console.log(error) 
}
}