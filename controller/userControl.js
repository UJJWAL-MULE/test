import userModel from "../Model/userModel.js";
import { comparePssword, hashPassword } from "../helper/userHelper.js";
import JWT from 'jsonwebtoken'

//adding registration data to databases
 const register= async (req,res)=>{
  //console.log("post api")
  try {
    const {name,email,address, password} =req.body
   
    if(!name){
      return res.send({name:"plz enter name"})
    }
    
    if(!email){
      return res.send({message:"Email is Required"})
  }
  if(!address){
      return res.send({message:"Address is Required"})
  }
  if(!password){
      return res.send({message:"Password is Required"})
  }

  const exsitingUser= await userModel.findOne({email})
  if(exsitingUser){
    return res.send({message:"plz enter differnt email id "})
  }


  const hashPass= await hashPassword(password)
  console.log(hashPass)
  
  //  it use to store the data to database ands save it .
  const user=await new userModel({name,email,address, password:hashPass}).save()

    res.status(200).send(
      {
        success:true,
        message:"user created successfully",
        user
      }
    )
    
  }catch (error) {
    res.status(500).send(
      {
        success:false,
        message:"user not added"
      }
    )
  }


}



// checking login details are right  
export const login_user = async (req,res)=>{

  try {

    const {email ,password}=req.body

    if(!email || !password){
      return res.send({message:"plz enter login or password"})
    }

    const user_d = await userModel.findOne({email})

    // if(password !== user_d.password){
    //   return res.send({message:"password is incorrect "})
    // }

    const match_pass= await comparePssword(password,user_d.password)

    if(!match_pass){
       res.send({
        success:false,
        message:"invalid email or password"
      })
    }
    



    const token=  await  JWT.sign({_id:user_d._id},process.env.secret_key)


    res.status(200).send({
      success:true,
      message:"user login successfully ",
      user_d:{
        name:user_d.name,
        email:user_d.email,
        address:user_d.address
      },
     token
    })

  } catch (error) {
    res.status(500).send({
      success:false,
      message:"not uploaded"
    })
    
  }
  
}

// fetching all user from database
export const allUser=async(req,res)=>{

 try {
  const all_data= await userModel.find()
  res.status(200).send({
    success:true,
    message:"all data got",
    all_data
  })
 } catch (error) {
  res.status(500).send({
    success:false,
    message:"not able to fetch data"
  })
 }
}

// only geting single user from database
export const singleUSer= async(req,res)=>{
  try {
    const data= await userModel.find({_id:req.params.id})
    if(!data){
      res.status(404).send({
        success:false,
        message:"data not able to fetched"
      })
    }
      res.status(200).send({
        success:true,
        message:"data fetched successfully",
        data
      })
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"no able to fetch"
    })
  }
}


//updating data in database

export const updata=async(req,res)=>{
  
try {

  const {name,email,address}=req.body;

  const user_data= await userModel.findById(req.params.id)

  if(!user_data){
    res.status(404).send({
      success:false,
      message:"data not found"
    })
  }
  
  if(name){
    user_data.name=name
  }

  if(email){
    user_data.email=email
  }

  if(address){
    user_data.address=address
  }
  
  await user_data.save()

  res.status(200).send(
    {
      success:true,
      message:"connected successfully",
      user_data
    }
  )
 
} catch (error) {
  res.status(500).send(
    {
      success:false,
      message:"server not connected"
    }
  )
}
}

// deleting data from database

export const delete_data= async(req,res)=>{
 try {
  const user= await userModel.findByIdAndDelete(req.params.id)
  if(!user){
    res.status(404).send({
      success:false,
      message:"data not found"
    })
  }

  res.status(200).send(
    {
      success:true,
      message:"deleted successfully",
      user:user
    }
  )


 } catch (error) {
  res.status(500).send(
    {
      success:false,
      message:"server not connected"
    }
  )
  
 }

}

export const protected_Route=(req,res)=>{
  res.send("Authorised user")
}


export default register

