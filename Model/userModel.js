import mongoose from "mongoose";

const userdata= mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true,
    },
  email:{
      type:String,
      unique:true,
      required:true,
      },
  address:{
        type:String,
        trim:true,
        required:true,
        },
  password:{
          type:String,
          trim:true,
          required:true,
          },
  role:{
    type:Number,
    default:true
  }
},{timestamps:true})

export default mongoose.model('user',userdata)