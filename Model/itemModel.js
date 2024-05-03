import mongoose, { Schema } from "mongoose";

const itemSchema= mongoose.Schema({
  name:{
    type:String,
    trim:true
    },
  description:{
      type:String,
      },
  type:[{type:mongoose.Types.ObjectId,ref:'Category'}]
 
},{timestamps:true})

export default mongoose.model('item',itemSchema)